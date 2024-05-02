
const LearningData = [
  { 
    type: "section lable",
    lable: "Data-Structures" 
  },
  {
    dataStructure: "Array",
    shortDescription: "An array is a data structure that stores a collection of elements, accessed by index, allowing for efficient random access. It's commonly used for organizing and manipulating lists of data in computer programs.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/array.svg",
    breakdown: "An array is a fundamental data structure used in computer programming to store a collection of elements. Think of it as a container that can hold multiple items of the same type, such as numbers, characters, or objects.",
    pros:[
      {pro:"Efficient Random Access: Arrays provide constant-time access to individual elements based on their index. This makes accessing elements by their position very fast and efficient."},      
      {pro:"Compact Storage: Elements in an array are stored in contiguous memory locations, which results in efficient memory usage. This compact storage reduces memory overhead compared to some other data structures."},      
      {pro:"Cache Friendliness: Accessing contiguous memory locations tends to be cache-friendly, as modern computer architectures often prefetch data into cache lines. This can lead to improved performance when iterating over array elements."},      
      {pro:"Simple and Easy to Use: Arrays are straightforward data structures, and most programming languages provide built-in support for them. They are easy to understand and manipulate, making them suitable for a wide range of applications."},           
      {pro:"Predictable Performance: Due to their fixed-size nature and constant-time access, arrays offer predictable performance characteristics. This makes them suitable for scenarios where performance is critical and needs to be tightly controlled."}
    ],
    cons:[
      {con:"Fixed Size: Static arrays have a fixed size, meaning they cannot grow or shrink dynamically after creation. This limitation can lead to wasted memory if the array size is too large or insufficient space if it's too small."},
      {con:"Inefficient Insertions and Deletions: Inserting or deleting elements in the middle of an array, especially for static arrays, can be inefficient. It may require shifting elements to accommodate the change, resulting in potentially costly operations."},
      {con:"Homogeneous Elements: Arrays typically store elements of the same data type. While this can provide efficiency in memory usage and access, it limits their flexibility compared to data structures that can store heterogeneous elements."},
      {con:"Memory Fragmentation: In languages with manual memory management, such as C or C++, arrays can contribute to memory fragmentation if they are allocated and deallocated frequently. This can lead to inefficient memory usage over time."},
      {con:"Lack of Dynamic Resizing (for Static Arrays): Static arrays have a fixed size determined at compile time. If the number of elements exceeds the array's capacity, it may lead to buffer overflow errors or require manual resizing, which can be cumbersome and error-prone."}
    ],
    components:[
      {component: "elements: These are the actual items stored in the array. They could be integers, floating-point numbers, characters, strings, or even more complex data types like objects or other arrays."},
      {component: "Container: This is what holds our elements"},
      {component: "index: Each element in the array has an index, which is like the label. The index helps us identify the position of an element in the array. Importantly, array indices usually start from 0 in many programming languages, so the first element is at index 0, the second element at index 1, and so forth"},
      {component: "Fixed Size: In many languages, arrays have a fixed size, meaning you have to specify the number of elements it can hold when you create it. Once created, the size of the array typically cannot be changed."}
    ],
    types:[
      {type:"One-Dimensional Array: This is the most basic type of array where elements are stored in a single row or column. Each element has a unique index, and access to elements is straightforward using these indices. One-dimensional arrays are often used for simple lists or sequences of data."},
      {type:"Multi-Dimensional Array: These arrays store elements in multiple rows and columns, forming a grid-like structure. Multi-dimensional arrays can have two or more dimensions, such as 2D arrays, 3D arrays, and so on. They are commonly used to represent matrices, tables, images, or any data with multiple dimensions."},
      {type:"Dynamic Array: A dynamic array is a resizable array data structure that automatically adjusts its size as elements are added or removed. It combines the benefits of arrays (constant-time access) with the flexibility of dynamic resizing. Languages like Python provide built-in support for dynamic arrays through data structures like lists."},
      {type:"Sparse Array: Sparse arrays are designed to efficiently store arrays with a large number of elements, most of which have a default value (often zero or null). Instead of storing all elements, sparse arrays only store non-default values along with their indices. This saves memory and can improve performance for certain types of data."},
      {type:"Jagged Array: In a jagged array (also known as an array of arrays), each element of the main array can be another array of different sizes. This allows for irregular or ragged data structures where each row (or sub-array) can have a different length. Jagged arrays are useful for representing data sets with varying lengths or dimensions."},
      {type:"Parallel Array: A parallel array consists of multiple arrays that have the same length, with each array containing data related to the corresponding element in another array. Parallel arrays are often used to represent multiple attributes or properties of a set of objects."},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/oigfaZ5ApsM?si=BNEcmFzGpiAf0fu4"},
      {video: "https://www.youtube.com/embed/6a39OjkCN5I?si=57TF9VgfIbSmdH4W"},
    ]
  },
  {
    dataStructure: "Linked List",
    shortDescription: "A linked list is a dynamic linear data structure comprising nodes, each containing data and a reference to the next node.",
    smallImg: "./src/resources/linked-list-small.svg",
    diagram: "./src/resources/linked_list_diagram.svg",
    breakdown: "A linked list is a fundamental data structure in computer science, often used for storing and managing collections of data. Unlike arrays, which store elements in contiguous memory locations, linked lists organize elements as individual nodes, where each node contains a piece of data and a reference or pointer to the next node in the sequence.",
    pros:[
      {pro:"Dynamic Size: Linked lists can dynamically grow and shrink in size as elements are added or removed, without requiring resizing like arrays."},
      {pro:"Efficient Insertions and Deletions: Inserting or deleting elements from a linked list typically requires only updating a few pointers, making these operations more efficient compared to arrays."},
      {pro:"Memory Efficiency: Linked lists only allocate memory for each node as needed, reducing wasted memory compared to arrays, which may require pre-allocation of a fixed size."},      
      ],
    cons:[
      {con:"Lack of Random Access: Unlike arrays, linked lists do not provide constant-time access to arbitrary elements. Accessing an element in a linked list requires traversing the list from the head, which can be inefficient for large lists."},
      {con:"Extra Memory Overhead: Linked lists require additional memory to store pointers, which can increase memory overhead compared to arrays, especially for small elements."},
      {con:"Cache Performance: Linked lists may not utilize hardware cache as effectively as arrays, leading to potentially slower performance in some scenarios."}
    ],
    components:[
      {component:"Node: Each element in a linked list is represented by a node. A node typically contains two parts: the data it holds and a reference (or pointer) to the next node in the sequence."},
      {component:"Head: The starting point of a linked list is called the head. It points to the first node in the list."},   
      {component:"Tail: The end of the linked list where the last node points to null, indicating the end of the list."},   
    ],
    types:[
      {type:"Singly Linked List: In a singly linked list, each node points to the next node in the sequence. Traversal of the list is typically done in one direction, from the head to the tail."},
      {type:"Doubly Linked List: In a doubly linked list, each node has two pointers: one pointing to the next node and another pointing to the previous node. This allows traversal in both forward and backward directions."},
      {type:"Circular Linked List: In a circular linked list, the last node points back to the first node, forming a circular structure."}
    ],
    overview:" linked lists are versatile data structures that excel in scenarios where dynamic size and efficient insertions and deletions are crucial, while being less suitable for applications requiring frequent random access to elements.",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {
        video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"
      },
      {
        video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"
      },
      {
        video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"
      }
    ]
  },

  {
    dataStructure: "Set",
    shortDescription: "A set is a collection of distinct elements where each element occurs only once within the set, commonly used in computer science and mathematics for efficient storage and manipulation of unique values.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/set.svg",
    breakdown: "A set data structure is a collection of distinct elements, where each element occurs only once within the set. It's commonly used in computer science and programming to store unique values and perform operations like membership testing, intersection, union, and difference.",
    pros:[
      {pro:"Unique Elements: Sets ensure that each element is unique, making them ideal for situations where you need to work with distinct values only."},
      {pro:"Fast lookup: Sets typically provide fast lookup operations. Checking whether an element is present in a set or not can be done in constant time, making sets efficient for membership testing."},
      {pro:"No Order Dependency: Sets do not maintain the order of elements, which can be advantageous in scenarios where the order of elements is not important, or where you want to ignore duplicates without considering their order."},
      {pro:"Dynamic Size: Sets can dynamically grow or shrink as elements are added or removed, providing flexibility in managing collections of data."},      
      ],
    cons:[
      {con:"Lack of Indexing: Sets do not support indexing or positional access to elements like arrays or lists. If you need to access elements by index, sets might not be the appropriate choice."},
      {con:"Mutable Elements: In some programming languages, the elements of a set must be immutable or have a stable hash value. This restriction can limit the types of elements that can be stored in a set."},
      {con:"Limited Operations: While sets support fundamental set operations like union, intersection, and difference, they may not offer operations commonly found in other data structures, such as sorting or random access."}
    ],
    components:[
      {component:"Elements: The individual items or values contained within the set. Each element in a set is unique, meaning it occurs only once within the set. Sets can contain elements of any data type, depending on the programming language or implementation."},
      {component:"Size: The number of elements in the set. The size of a set can vary dynamically as elements are added or removed."},
      {component:"Operations: Sets support various operations for manipulating and interacting with the elements. Common set operations include: Adding elements,Removing elements, Checking for the presence of elements (membership testing), Performing mathematical operations (like union, intersection, difference, and symmetric difference)"}
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/mzlIYyY6he4?si=QuGyQbgunw94HbnU"},
      {video: "https://www.youtube.com/embed/r3R3h5ly_8g?si=MFssL1j7KTkzWjSL"},
      {video: "https://www.youtube.com/embed/mCWi6d-i8p0?si=aFWTLQW22y6oaG2r"},
    ]
  },
  {
    dataStructure: "Hash Table",
    shortDescription: "A hash table is a data structure that stores key-value pairs, allowing efficient retrieval of values based on their associated keys.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/hash-table.svg",
    breakdown: "A hash table is a data structure that stores key-value pairs, allowing efficient retrieval of values based on their associated keys.",
    pros:[
      {pro:"Fast Retrieval: Hash tables provide fast retrieval of values based on keys, typically with constant-time complexity on average, making them ideal for applications requiring efficient data lookup."},
      {pro:"Flexible Key Types: Hash tables can accommodate a wide range of key types, including integers, strings, objects, and more."},
      {pro:"Dynamic Size: Hash tables can dynamically resize themselves as needed, accommodating changes in the number of stored key-value pairs while maintaining efficient performance."}
      ],
    cons:[
      {con:"Hash Collisions: Hash collisions occur when two different keys hash to the same index, which can degrade the performance of hash table operations. Resolving collisions adds complexity to hash table implementations."},
      {con:"Memory Overhead: Hash tables may have higher memory overhead compared to other data structures due to potential unused space in the underlying array and additional storage for pointers in chaining-based implementations."},
      {con:"Not Ordered: Hash tables do not maintain any inherent order among the stored key-value pairs. If ordered traversal or iteration is required, additional mechanisms may be needed."}
    ],
    components:[
      {component:"Key: A unique identifier used to access the associated value in the hash table"},
      {component:"Value: The data associated with a key in the hash table."},
      {component:"Hash Function: A function that takes a key as input and computes a hash code or hash value, which is used to determine the index or position where the key-value pair should be stored in the hash table."},
      {component:"Array or Bucket Array: The underlying array or array of linked lists where the key-value pairs are stored. Each element in the array is often referred to as a (bucket)."}
    ],
    types:[
      {type:"Open Addressing: In open addressing, if a hash collision occurs (i.e., two keys hash to the same index), the hash table probes or searches for an alternative location to store the key-value pair. Common techniques include linear probing, quadratic probing, and double hashing."},
      {type:"Chaining: In chaining, each bucket in the hash table contains a linked list of key-value pairs that hash to the same index. If a collision occurs, the new key-value pair is appended to the linked list at the corresponding bucket."}
    ],
    overview:"Hash tables are widely used in various applications due to their efficiency in data retrieval, but they require careful consideration of hash function design, collision resolution strategies, and memory usage to ensure optimal performance.",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/sfWyugl4JWA?si=57puLmsADoVSTwNB"},
      {video: "https://www.youtube.com/embed/shs0KM3wKv8?si=cPDeBPbnIlW-NjAl"},
    ]
  },
  {
    dataStructure: "Stack",
    shortDescription: "A stack data structure is a Last-In-First-Out (LIFO) collection of elements where items are added and removed from the top only. It operates like a stack of plates, allowing efficient insertion and removal of elements, with access restricted to the topmost item.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/stack.svg",
    breakdown: "A stack data structure is a collection of elements that follows the Last-In-First-Out (LIFO) principle, meaning that the last element added to the stack is the first one to be removed. It operates like a stack of plates, where you can only add or remove plates from the top",
    pros:[
      {pro:"Simple Structure: Stacks have a simple and intuitive structure, making them easy to understand and implement"},      
      {pro:"Fast Operations: Push and pop operations on a stack typically have constant-time complexity, making them efficient for managing data in Last-In-First-Out (LIFO) order"},
      {pro:"Memory Management: Stack memory is automatically managed by the system, making it suitable for managing function calls and local variables in programming languages."}
      ],
    cons:[
      {con:"Limited Access: Stacks offer restricted access to elements. Only the top element of the stack can be accessed or removed, and there's no direct access to other elements"},
      {con:"Fixed Size (for Array-based Stacks): Array-based stacks may have a fixed size, leading to potential overflow errors if the stack becomes full"}
    ],
    components:[
      {component:"Elements: The individual items or values stored in the stack"},
      {component:"Top: The topmost element of the stack, which is the most recently added element."},
      {component:"Bottom: The bottom of the stack, which is the least recently added element. It's opposite to the top."},
      {component:"Push Operation: Adding an element to the top of the stack."},
      {component:"Pop Operation: Removing the top element from the stack."}
    ],
    types:[
      {type:"Array-based Stack: Implementing a stack using an array data structure, where elements are stored in contiguous memory locations."},
      {type:"Linked List-based Stack: Implementing a stack using a linked list data structure, where each element contains a reference to the next element in the stack."}
    ],
    overview:"Stacks are versatile data structures with various applications in computer science and software engineering. Understanding their properties and usage can be beneficial for solving a wide range of problems efficiently.",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/F1F2imiOJfk?si=R2OBniFO95KN_0fm"},
    ]
  },
  {
    dataStructure: "Queue",
    shortDescription: "A queue is like a line where the first person to join is the first to leave.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/queue.svg",
    breakdown: "A queue data structure is a collection of elements that follows the First-In-First-Out (FIFO) principle, meaning that the first element added to the queue is the first one to be removed. It operates like a queue of people waiting in line, where the person who joins the line first is the first one to be served.",
    pros:[
      {pro:"FIFO Ordering: Queues follow the First-In-First-Out (FIFO) principle, ensuring that the first element enqueued is the first one to be dequeued, making them suitable for scenarios where order preservation is important."},      
      {pro:"Efficient Insertion and Removal: Enqueue and dequeue operations in a queue typically have constant-time complexity or amortized constant time, making queues efficient for managing data in FIFO order."},
      {pro:"Flexible Size: Queues can dynamically resize themselves as needed, accommodating changes in the number of stored elements while maintaining efficient performance."}
      ],
    cons:[
      {con:"Limited Access: Queues offer restricted access to elements. Only the front element of the queue can be dequeued, and there's no direct access to other elements."},
      {con:"No Priority: Standard queues do not consider the priority of elements, which may be a limitation in scenarios where prioritization is required."}
    ],
    components:[
      {component:"Elements: The individual items or values stored in the queue."},
      {component:"Front: The front or head of the queue, which is the position where elements are removed (dequeued)."},
      {component:"Rear: The rear or tail of the queue, which is the position where elements are added (enqueued)."},
      {component:"Enqueue Operation: Adding an element to the rear of the queue"},
      {component:"Dequeue: Removing the element at the front of the queue"}
    ],
    types:[
      {type:"Linear Queue: A simple queue where elements are stored in a linear order. When the rear of the queue reaches the end of the underlying data structure, such as an array, elements can wrap around to the beginning."},
      {type:"Circular Queue: A queue where the rear can wrap around to the front, allowing efficient use of space and avoiding the need for elements to be shifted when dequeuing."},
      {type:"Priority Queue: A queue where elements have associated priority values, and elements with higher priority are dequeued before those with lower priority."}
    ],
    overview:"Queues are versatile data structures with various applications in computer science, software engineering, and other fields. Understanding their properties and usage can be beneficial for solving a wide range of problems efficiently.",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/1j2gWyY5CK4?si=Iz83wX2zkM5hsos3"},
    ]
  },
  {
    dataStructure: "Trees",
    shortDescription: "A tree data structure is a hierarchical collection of nodes, with each node having a value and zero or more child nodes, organized in a branching structure.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/trees.svg",
    breakdown: "A tree data structure is a hierarchical collection of nodes where each node has a value and may have zero or more child nodes, forming a branching structure. Trees are used to represent hierarchical relationships and are commonly employed in computer science and data storage.",
    pros:[
      {pro:"Hierarchical Representation: Trees allow for the representation of hierarchical relationships, making them suitable for modeling hierarchical data such as file systems, organizational charts, and family trees."},      
      {pro:"Efficient Searching: Trees can facilitate efficient searching and retrieval operations, particularly in binary search trees (BSTs), which maintain the property that elements in the left subtree are less than the root, and elements in the right subtree are greater than the root."},
      {pro:"Balanced Trees: Balanced trees, such as AVL trees and Red-Black trees, offer efficient insertion, deletion, and searching operations with guaranteed logarithmic time complexity, ensuring optimal performance in various applications."}
      ],
    cons:[
      {con:"Complexity: Implementing and managing trees can be complex, especially for balanced trees and advanced tree structures."},
      {con:"Memory Overhead: Trees may have higher memory overhead compared to simpler data structures, especially for balanced trees that require additional metadata to maintain balance."}
    ],
    components:[
      {component:"Node: Each element in a tree is called a node and consists of a value and references to its child nodes (if any)."},
      {component:"Root: The topmost node of the tree, serving as the entry point for accessing other nodes."},
      {component:"Parent: A node that has child nodes."},
      {component:"Child: Nodes directly connected to another node when moving away from the root."},
      {component:"Leaf: Nodes that do not have any children, located at the ends of branches."},
      {component:"Height: The length of the longest path from the root node to a leaf node, representing the depth of the tree."}
    ],
    types:[
      {type:"Binary Tree: A tree in which each node has at most two children, commonly used for representing expressions, binary search trees, and hierarchical structures."},
      {type:"Binary Search Tree (BST): A binary tree that satisfies the property that elements in the left subtree are less than the root, and elements in the right subtree are greater than the root, facilitating efficient searching and retrieval."},
      {type:"AVL Tree: A self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one, ensuring logarithmic time complexity for insertion, deletion, and searching operations"},
      {type:"Red-Black Tree: Another type of self-balancing binary search tree that guarantees logarithmic time complexity for insertion, deletion, and searching operations, with additional constraints on node coloring and rotations"},
    ],
    overview:"",
    resources: [
      {
        title: "GeeksForGeeks",
        link: "https://www.geeksforgeeks.org/tree-data-structure/videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/oSWTXtMglKE?si=YdRZThEyB5OCey6Y"},
      {video: "https://www.youtube.com/embed/GzJoqJO1zdI?si=K7_BPnHs1v1kPu92"},
      {video: "https://www.youtube.com/embed/pYT9F8_LFTM?si=JesEY1rfZyG4VY55"},
    ]
  },
  {
    dataStructure: "Graphs",
    shortDescription: "A graph data structure is a mathematical representation of relationships between objects, comprising nodes (vertices) and edges (connections) that link these nodes.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/graph.svg",
    breakdown: "A graph data structure is a mathematical abstraction comprising a collection of nodes (vertices) and edges (connections) that link pairs of nodes, enabling the representation and analysis of relationships between entities, with various configurations such as directed, undirected, weighted, or cyclic, facilitating efficient traversal and manipulation to solve computational problems.",
    pros:[
      {pro:"Flexibility: Graphs can model complex relationships found in real-world scenarios."},
      {pro:"Versatility: Graphs can represent various types of relationships and structures."},
      {pro:"Efficiency: Enables efficient traversal and manipulation for solving diverse computational problems."}
    ],
    cons:[
      {con:"Complexity: Managing large graphs can be computationally intensive."},
      {con:"Memory Usage: Storing large graphs can require significant memory."},
      {con:"Algorithm Design: Some graph algorithms may be complex to design and implement."}
    ],
    components:[
      {component:"Nodes (Vertices): Represent entities in the graph."},
      {component:"Edges (Connections): Define relationships between nodes."},
      {component:"Weights: Optional values assigned to edges, representing costs or distances."},
      {component:"Adjacency List: A data structure storing the list of adjacent nodes for each node."},
      {component:"Adjacency Matrix: A matrix representation indicating connections between nodes."},
      {component:"Degree: The number of edges incident to a node."},
      {component:"Path: A sequence of nodes connected by edges."},
      {component:"Cycle: A path that starts and ends at the same node."}
    ],
    types:[
      {type:"Directed Graphs (Digraphs): Edges have a direction, indicating one-way relationships."},
      {type:"Undirected Graphs: Edges have no direction, representing symmetric relationships."},
      {type:"Weighted Graphs: Edges have weights, indicating the cost or distance between nodes."},
      {type:"Cyclic Graphs: Contain cycles, where a sequence of edges leads back to a starting node."},
      {type:"Acyclic Graphs: Do not contain cycles."},
      {type:"Sparse Graphs: Have relatively few edges compared to the number of nodes."},
      {type:"Dense Graphs: Have many edges relative to the number of nodes."},
    ],
    overview:"Graph data structures are fundamental in various fields such as computer science, network analysis, and operations research, providing powerful tools for modeling, analyzing, and solving complex problems.",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/4IZ80K72OXo?si=tiJLouzifeWMEenl"},
      {video: "https://www.youtube.com/embed/0sQE8zKhad0?si=ELpMDhGSh5pGoDKj"},
      
    ]
  },
  
  { 
    type: "section lable",
    lable: "Algorithms" 
  },
  {
    dataStructure: "Binary Search",
    shortDescription: "Binary search is a divide-and-conquer algorithm that efficiently locates a target value within a sorted array or list by repeatedly dividing the search interval in half.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/binary-search.svg",
    breakdown: "Binary search is a divide-and-conquer algorithm used to efficiently locate a target value within a sorted array or list. It works by repeatedly dividing the search interval in half until the target value is found or the search interval is empty. At each step, it compares the target value with the middle element of the current interval and narrows down the search space accordingly.",
    pros:[
      {pro:"Efficiency: Binary search operates with a time complexity of O(log n), making it highly efficient for searching large sorted datasets."},
      {pro:"Simplicity: The algorithm is relatively straightforward to implement and understand."},      
      {pro:"Optimization: Binary search narrows down the search space by half with each iteration, leading to quick convergence to the target value."}  
    ],
    cons:[
      {con:"Requirement of Sorted Data: Binary search requires the data to be sorted beforehand, which can be a limitation if the dataset is frequently modified or if sorting is costly."},
      {con:"Limited Applicability: It can only be applied to sorted arrays or lists, restricting its usage in scenarios where sorting is not feasible or where the data structure cannot be sorted efficiently."},
      {con:"Memory Overhead: While the algorithm itself is memory-efficient, it may require additional memory for storing the sorted array or list."},
    ],
    components:[
      {component:"Sorted Array/List: The binary search algorithm requires the data to be sorted beforehand, either in ascending or descending order      "},
      {component:"Target Value: The value being searched for within the array or list."},
      {component:"Search Interval: The range of indices within which the target value may be located, which is continuously narrowed down during each iteration."},
      {component:"Middle Element: The element at the midpoint of the current search interval, used to determine whether the target value lies in the first half or the second half of the interval."}
    ],
    overview:"Binary search is widely used in various applications such as searching in databases, dictionaries, and sorted arrays in programming languages due to its efficiency and simplicity. However, it's essential to ensure that the data remains sorted and that the overhead of sorting is justified by the frequency and complexity of search operations.    ",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/P3YID7liBug?si=JcsPpB2KO3QS4f5z"},
      {video: "https://www.youtube.com/embed/7lGiPItOVCM?si=EhzaQm358JZrcnHd"},
    ]
  },
  {
    dataStructure: "Recursion",
    shortDescription: "To understand recursion, you must first understand recursion",
    smallImg: "./src/resources/",
    diagram: "./src/resources/recursion.svg",
    breakdown: "A recursive algorithm is one that solves a problem by breaking it down into smaller, simpler instances of the same problem. These smaller instances are then solved recursively until they reach a base case, which is a trivial instance that can be solved directly without further recursion. The solutions to the smaller instances are then combined to obtain the solution to the original problem.",
    steps:[
      {step:"Identify the base case(s) - These are the simplest instances of the problem that can be solved directly."},
      {step:"Define the recursive case(s) - These are the cases where the problem is broken down into smaller subproblems."},
      {step:"Call the function recursively with the smaller subproblems."},
      {step:"Combine the solutions of the smaller subproblems to obtain the solution to the original problem."}
    ],
    pros:[
      {pro:"Elegant and intuitive solution for certain types of problems."},      
      {pro:"Can lead to simpler code compared to iterative solutions"},
      {pro:"Often closely matches the problem definition, making it easier to understand and implement."}
      ],
    cons:[
      {con:"Can lead to stack overflow if not implemented carefully (due to excessive recursion)."},
      {con:"May be less efficient in terms of memory and performance compared to iterative solutions for certain problems."},
      {con:"Debugging recursive algorithms can be challenging."}
    ],
    components:[
      {component:"Base case: The terminating condition that stops the recursion. It's the simplest instance of the problem that can be solved directly."},
      {component:"Recursive case: The part of the algorithm where the function calls itself with smaller instances of the same problem."},
      {component:"Parameters: The input to the recursive function, which may change with each recursive call."}
    ],
    types:[
      {type:"Linear Recursion: This is the most basic form of recursion, where a function calls itself only once in each recursion step. Linear recursion typically involves reducing the problem size by one in each recursive call until it reaches a base case. The example of calculating factorial that I provided earlier is an example of linear recursion."},
      {type:"Tail Recursion: In tail recursion, the recursive call is the last thing executed by the function. This means that there's no need to keep track of the intermediate state between recursive calls, allowing some compilers or interpreters to optimize the recursion into an iterative form. Tail recursion is particularly useful in languages that support tail call optimization, as it avoids stack overflow errors for deep recursion. An example of tail recursion is finding the sum of elements in a list:"},
      {type:"Binary Recursion: In binary recursion, a function makes two recursive calls in each step. This often results in a divide-and-conquer approach, where the problem is divided into two subproblems of roughly equal size. Binary recursion is commonly used in algorithms such as binary search and certain sorting algorithms like quicksort and mergesort."},
      {type:"Multiple Recursion: In multiple recursion, a function makes more than two recursive calls in each step. This approach is less common but can be useful in certain scenarios, such as tree traversal algorithms."},
      {type:"Nested Recursion: Nested recursion occurs when a recursive function calls itself with a modified argument that is itself a recursive call. This type of recursion can be harder to understand and analyze but is sometimes necessary for solving certain types of problems efficiently."}

    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Sliding Window",
    shortDescription: "The sliding window algorithm efficiently processes a fixed-size window moving through the input data, solving problems by iteratively updating computations on subsets of the dataset.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/sliding-window.svg",
    breakdown: "The sliding window algorithm is a technique used in computer science to solve problems involving arrays or strings. It operates by maintaining a window of fixed size that moves through the input data, processing a portion of the data at each step. The key idea is to efficiently perform computations on a subset of the input data by iteratively moving the window through the entire dataset.",
    identify:[
      {trait:"The problem involves finding a substring, subarray, or subsequence that meets certain criteria within a larger dataset."},
      {trait:"There's a requirement to efficiently process a fixed-size window that moves through the input data."},
      {trait:"The solution can be incrementally updated or calculated as the window slides through the dataset."},
      {trait:"The problem exhibits characteristics like linear time complexity and can be solved iteratively without nested loops."}
    ],
    example_snippet:"./src/resources/sliding-window-screenshot.png",
    steps:[
      {step:"Initialization: Set up the initial window by defining its starting and ending points."},
      {step:"Process the Window: Perform operations on the elements within the window."},
      {step:"Slide the Window: Move the window to the right (or left, depending on the problem) by one element."},
      {step:"Repeat: Continue steps 2 and 3 until the window reaches the end of the input data."}
    ],
    pros:[
      {pro:"Efficiency: The algorithm typically has a time complexity of O(n), where n is the size of the input data."},      
      {pro:"Space Efficiency: It usually requires only a constant amount of extra space for storing the window."},
      {pro:"Simplicity: The algorithm is relatively easy to understand and implement."},
      {pro:"Optimization: It often allows for optimization by pruning unnecessary computations."}
      ],
    cons:[
      {con:"Window Size Selection: Choosing the right window size can be crucial for optimal performance, and determining it may not always be straightforward."},
      {con:"Limited Applicability: Some problems may have constraints that make them unsuitable for the sliding window approach."}
    ], 
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Backtracking",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Hashing Function",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "Two pointer",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Breadth-First search (BFS)",
    shortDescription: "Breadth-first search (BFS) is a graph traversal algorithm that systematically explores nodes level by level",
    smallImg: "./src/resources/",
    diagram: "./src/resources/BFS.svg",
    breakdown: "Breadth-first search (BFS) is a traversal algorithm that explores the datastrucutres (trees & graphs) level by level. Starting from a specified vertex or root node, BFS systematically visits all vertices reachable from that point by visiting the nearest unvisited node first before moving to the nodes farther away.",
    example_snippet:"./src/resources/BFS-screenshot.png",
    steps:[
      {step:"Initialize an empty queue and a set or array to track visited vertices."},
      {step:"Enqueue the starting node/vertex into the queue and mark it as visited."},
      {
        step:"Repeat the following steps until the queue is empty:",
        substep:[
          {sub:"Dequeue a node/vertex from the queue",},
          {sub:"Visit the dequeued node/vertex and process it",},
          {sub:"Enqueue all unvisited adjacent nodes/vertices of the dequeued node/vertex into the queue and mark them as visited"}
        ]
      },
      {step:"When the queue becomes empty, the BFS traversal is complete."}
    ],
    pros:[
      {pro:"Completeness: BFS guarantees to find the shortest path in an unweighted graph.pro"},     
      {pro:"Optimal solution for shortest path: When searching for the shortest path, BFS finds the optimal solution because it explores nodes level by level."},
      {pro:"Determines connectivity: BFS can determine whether a graph is connected or not by visiting all reachable vertices."},
      {pro:"Suitable for finding the shortest path in unweighted graphs and for solving problems that involve traversing all vertices in a graph level by level."},
      ],
    cons:[
      {con:"Memory usage: BFS may consume a significant amount of memory, especially for large graphs, as it requires storing all visited vertices in a queue."},
      {con:"Slower than DFS in some cases: BFS may be slower than depth-first search (DFS) when the solution is located deep in the graph, as it systematically explores all vertices at each level before moving deeper."}
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:"Standard BFS: In the standard BFS, each vertex is visited exactly once, and all adjacent vertices are explored before moving to the next level."},
      {type:"Bidirectional BFS: Bidirectional BFS is an optimized version of BFS that simultaneously explores vertices from both the source and destination vertices, meeting at a common vertex or intersection point. This approach can significantly reduce the search space and improve efficiency, especially in graphs with a large number of vertices."}
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Depth-First Search (DFS)",
    shortDescription: "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/DFS.svg",
    breakdown: "Depth-first search (DFS) is traversal algorithm that explores as far as possible along each branch before backtracking. Starting from a specified node/vertex, DFS systematically explores all nodes/vertices reachable from that vertex by recursively visiting adjacent unvisited nodes/vertices.",
    example_snippet:"./src/resources/DFS-screenshot.png",
    steps:[
      {step:"Initialize a set or array to track visited vertices and an empty stack to store vertices to be explored."},
      {step:"Push the starting vertex onto the stack and mark it as visited."},
      {
        step:"Repeat the following steps until the stack is empty:",
        substep:[
          {sub:"Pop a vertex from the stack."},
          {sub:"Visit the popped vertex and process it."},
          {sub:"For each unvisited adjacent vertex of the popped vertex, push it onto the stack and mark it as visited."},
        ]
      },
      {step:"When the stack becomes empty, the DFS traversal will be complete"}
    ],
    pros:[
      {pro:"Memory efficiency: DFS typically requires less memory compared to breadth-first search (BFS), as it only needs to store information about the current path being explored."},      
      {pro:"Suitable for problems with multiple solutions: DFS can be useful for finding multiple solutions, as it exhaustively explores all paths in the graph."},
      {pro:"Detecting cycles: DFS can detect cycles in a graph by checking for back edges during traversal."},
      ],
    cons:[
      {con:"Completeness: DFS may not find a solution if the graph contains cycles, as it can get stuck in an infinite loop."},
      {con:"Non-optimal solution for shortest path: DFS does not guarantee finding the shortest path between two vertices, as it may explore deeper paths before exploring shorter ones."},
      {con:"Performance: DFS can be slower than BFS for finding the shortest path, especially in graphs with deep paths."},
      
    ],
    components:[
      {component:"Initialization: Begin by selecting a starting vertex (or node) to start the traversal."},
      {component:"Visit Vertex: Visit the current vertex and mark it as visited."},
      {component:"Explore Neighbors: Recursively explore all unvisited neighboring vertices of the current vertex."},
      {component:"Base Case: Define a base case or termination condition to stop the recursion, such as when all vertices have been visited."},
      {component:"Backtracking (if needed): In some cases, backtracking may be necessary to explore alternative paths or to undo certain decisions made during the traversal."},
    ],
    types:[
      {type:"Pre-order traversal: In pre-order traversal, the algorithm visits the current node, then recursively traverses the left subtree, followed by the right subtree. This traversal is often used in binary trees to produce a prefix expression of the tree."},
      {type:"In-order traversal: In in-order traversal, the algorithm recursively traverses the left subtree, visits the current node, and then recursively traverses the right subtree. This traversal is commonly used in binary search trees (BST) to produce a sorted list of elements."},
      {type:"Post-order traversal: In post-order traversal, the algorithm recursively traverses the left subtree, recursively traverses the right subtree, and then visits the current node. This traversal is useful for tasks like deleting a tree from leaf to root."},
      {type:"Path tracing: During the DFS traversal, you can maintain a data structure (e.g., an array or list) to trace the path from the starting node to the current node. This path can be used to find specific paths or to analyze the structure of the graph."},
      {type:"Backtracking: In some scenarios, DFS is used for backtracking to find paths that satisfy certain conditions or constraints. The algorithm explores all possible paths from the starting node and backtracks whenever it encounters a dead end or violation of constraints."},
      
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Greedy",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
   {
    dataStructure: "Two Pointer",
    shortDescription: "The two-pointer algorithm is a technique that involves using two pointers to efficiently solve problems by iterating through an array or list and manipulating the pointers based on specific conditions",
    smallImg: "./src/resources/",
    diagram: "./src/resources/two-pointer.svg",
    breakdown: "The two-pointer technique involves using two pointers that traverse through an array or list from different positions or in different directions. These pointers can be adjusted based on certain conditions to solve specific problems efficiently.",
    example_snippet:"./src/resources/two-pointer-screenshot.png",
    steps:[
      {step:"Initialize pointers: Depending on the problem, initialize two pointers at different positions in the array or list."},
      {step:"Iterate through the array or list: While certain conditions are met, move the pointers accordingly."},
      {step:"Adjust pointers: Based on the problem's requirements, adjust the pointers' positions to solve the problem efficiently."},
      {step:"Termination condition: Determine the condition under which the iteration stops."},
    ],
    pros:[
      {pro:"Efficiency: The two-pointer technique can often solve problems with a time complexity of O(n), making it efficient for large datasets."},      
      {pro:"Space Efficiency: It typically requires only a constant amount of additional space."},
      {pro:"Simplicity: It's relatively easy to understand and implement."},
      ],
    cons:[
      {con:"Not Suitable for All Problems: While powerful, the two-pointer technique is not applicable to every problem and may not always provide the most optimal solution."},
      {con:"Limited Applicability: It's primarily useful for problems involving arrays or lists where the order of elements matters."}
    ],
    components:[
      {component:"Setting up the Pointers: Decide where the pointers start in the array or list."},
      {component:"Moving the Pointers: Decide how the pointers move through the array or list."},
      {component:"Looping: Keep doing the moving step until a certain condition is met."},
      {component:"Stopping: Know when to stop moving the pointers based on the problem."},
      {component:"Solving the Problem: Use the pointers to solve the specific problem you're working on."},
    ],
    types:[
      {type:"Same Direction Pointers: Both pointers move in the same direction, usually from left to right or right to left, to solve problems such as finding pairs that sum up to a target value or removing duplicates from a sorted array."},
      {type:"Opposite Direction Pointers: One pointer moves from the beginning of the array, while the other moves from the end, typically used for problems like searching for a target element in a sorted array or list."}
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Dynamic Programing",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  
  {
    type:"section lable",
    lable:"Sorting"
  },
  {
    dataStructure: "Bubble Sort",
    shortDescription: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order until the list is sorted.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/bubble-sort.svg",
    breakdown: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items, and swaps them if they are in the wrong order. This process is repeated until no swaps are needed, which indicates that the list is sorted.",
    
    example_snippet:"./src/resources/bubble-sort-screenshot.png",
    steps:[
      {step:"Start from the beginning of the list."},
      {step:"Compare the first two elements. If the first element is greater than the second element, swap them."},
      {step:"Move to the next pair of elements and repeat step 2."},
      {step:"Continue this process until the end of the list is reached."},
      {step:"Repeat steps 1-4 until no swaps are needed."},
    ],
    pros:[
      {pro:"Simple implementation: Bubble sort is easy to understand and implement."},   
      {pro:"Space efficiency: Bubble sort typically requires only a constant amount of additional space, as it operates directly on the input array."},
      {pro:"Works well for small datasets: It can perform well for small datasets or nearly sorted lists."}  
      ],
    cons:[
      {con:"Inefficient for large datasets: Bubble sort has a time complexity of O(n^2), making it highly inefficient for large datasets."},
      {con:"Poor performance: Its average and worst-case time complexities are not efficient compared to other sorting algorithms like merge sort or quicksort."},
      {con:"Inefficient for partially sorted lists: Even if a large portion of the list is already sorted, bubble sort still needs to iterate through the entire list."}
    ],
    components:[
      {component:"Input Array: The unsorted array that you want to sort."},
      {component:"Looping Mechanism: A loop that iterates over the array multiple times until the array is fully sorted. This loop ensures that the sorting process continues until no more swaps are needed."},
      {component:"Comparison of Adjacent Elements: Within each iteration of the loop, compare adjacent elements of the array. This comparison determines whether a swap is necessary to correct the order of elements."},
      {component:"Swapping Mechanism: If two adjacent elements are out of order (i.e., the first element is greater than the second element in the case of sorting in ascending order), they need to be swapped to correct the order."},
    ],
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Quick Sort",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Merge Sort",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  
  {
    type:"section lable",
    lable:"extra"
  },
  {
    dataStructure: "Node",
    shortDescription: "a node is a fundamental building block of various data structures, particularly linked data structures such as linked lists, trees, graphs, and more.",
    smallImg: "./src/resources/",
    diagram: "./src/resources/node.svg",
    breakdown: "A node is an individual element within a data structure that contains data or information, and optionally one or more references or pointers to other nodes, depending on the type of data structure.",

    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],

  },
  {
    dataStructure: "Memoization",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Caching",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  },
  {
    dataStructure: "Big O (time/space complexity)",
    shortDescription: "",
    smallImg: "./src/resources/",
    diagram: "./src/resources/",
    breakdown: "",
    pros:[
      {pro:"pro"},      
      ],
    cons:[
      {con:"con"},
    ],
    components:[
      {component:""},
    ],
    types:[
      {type:""},
    ],
    overview:"",
    resources: [
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      },
      {
        title: "title",
        link: "videoLink"
      }
    
    ],
    videos: [
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
      {video: "https://www.youtube.com/embed/X6AR2RMB5tE?si=dxn6x9uC0HuMM4VJ"},
    ]
  }
  
]


export default LearningData