import { useState } from 'react';

export const Verify = () => {
  const [xpath, setXpath] = useState('');

  const handleVerify = () => {
    if (!xpath.trim()) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (userXPath) => {
          const getElementsByXPath = (xpath, parent) => {
            const results = [];
            const query = document.evaluate(
              xpath,
              parent || document,
              null,
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
              null
            );
            for (let i = 0; i < query.snapshotLength; i++) {
              results.push(query.snapshotItem(i));
            }
            return results;
          };

          const elements = getElementsByXPath(userXPath);
          if (elements.length === 0) {
            alert('No elements found for this XPath.');
            return;
          }

          elements.forEach((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.outline = '2px solid lime';
          });
        },
        args: [xpath]
      });
    });
  };

  return (
    <div className="bg-white shadow-xl p-4 rounded-xl w-[300px] text-sm space-y-2">
      <h2 className="font-semibold text-lg">Verify XPath</h2>
      <input
        type="text"
        value={xpath}
        onChange={(e) => setXpath(e.target.value)}
        placeholder="Enter XPath"
        className="w-full px-2 py-1 border border-gray-300 rounded"
      />
      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Highlight Elements
      </button>
    </div>
  );
};
