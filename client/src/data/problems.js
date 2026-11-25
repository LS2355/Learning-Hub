const rows = [
  [1, 'Two Sum', 'easy', 'Arrays'], [2, 'Add Two Numbers', 'medium', 'Linked lists'],
  [3, 'Longest Substring Without Repeating Characters', 'medium', 'Sliding window'],
  [4, 'Median of Two Sorted Arrays', 'hard', 'Binary search'], [7, 'Reverse Integer', 'medium', 'Math'],
  [15, '3Sum', 'medium', 'Two pointers'], [20, 'Valid Parentheses', 'easy', 'Stacks'],
  [21, 'Merge Two Sorted Lists', 'easy', 'Linked lists'], [22, 'Generate Parentheses', 'medium', 'Backtracking'],
  [23, 'Merge k Sorted Lists', 'hard', 'Heaps'], [26, 'Remove Duplicates from Sorted Array', 'easy', 'Two pointers'],
  [27, 'Remove Element', 'easy', 'Arrays'], [33, 'Search in Rotated Sorted Array', 'medium', 'Binary search'],
  [37, 'Sudoku Solver', 'hard', 'Backtracking'], [49, 'Group Anagrams', 'medium', 'Hash tables'],
  [53, 'Maximum Subarray', 'medium', 'Dynamic programming'], [70, 'Climbing Stairs', 'easy', 'Dynamic programming'],
  [76, 'Minimum Window Substring', 'hard', 'Sliding window'], [98, 'Validate Binary Search Tree', 'medium', 'Trees'],
  [102, 'Binary Tree Level Order Traversal', 'medium', 'BFS'], [104, 'Maximum Depth of Binary Tree', 'easy', 'Trees'],
  [121, 'Best Time to Buy and Sell Stock', 'easy', 'Arrays'], [125, 'Valid Palindrome', 'easy', 'Two pointers'],
  [141, 'Linked List Cycle', 'easy', 'Linked lists'], [150, 'Evaluate Reverse Polish Notation', 'medium', 'Stacks'],
  [153, 'Find Minimum in Rotated Sorted Array', 'medium', 'Binary search'], [155, 'Min Stack', 'medium', 'Stacks'],
  [198, 'House Robber', 'medium', 'Dynamic programming'], [200, 'Number of Islands', 'medium', 'Graphs'],
  [206, 'Reverse Linked List', 'easy', 'Linked lists'], [217, 'Contains Duplicate', 'easy', 'Sets'],
  [226, 'Invert Binary Tree', 'easy', 'Trees'], [242, 'Valid Anagram', 'easy', 'Hash tables'],
  [283, 'Move Zeroes', 'easy', 'Two pointers'], [300, 'Longest Increasing Subsequence', 'medium', 'Dynamic programming'],
  [322, 'Coin Change', 'medium', 'Dynamic programming'], [347, 'Top K Frequent Elements', 'medium', 'Hash tables'],
  [417, 'Pacific Atlantic Water Flow', 'medium', 'Graphs'], [543, 'Diameter of Binary Tree', 'easy', 'Trees'],
  [704, 'Binary Search', 'easy', 'Binary search'], [733, 'Flood Fill', 'easy', 'DFS'],
];

export const problemCatalog = rows.map(([number, title, difficulty, topic]) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return { id: slug, slug, number: String(number), title, difficulty, topic, status: 'next', note: '' };
});
export const starterProblems = [1, 20, 21, 121, 217, 704].map(number => problemCatalog.find(x => x.number === String(number)));
