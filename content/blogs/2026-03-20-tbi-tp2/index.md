---
title: Making Search Engine from Scratch
date: 2026-03-20
# description: Information Retrieval
---


{{< img src="pak-alfan.png" width="auto" caption="Shoutout from Pak Alfan" >}}

[Original post](https://www.linkedin.com/posts/alfan-farizki-26484885_csce604135-web-search-information-retrieval-share-7440428057875611648-CrIv?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADxso5oBhRhzmgsZMBpWath_XS50KipwA0U) | [Source code](https://github.com/Frmeta/search-engine-from-scratch)

I’m incredibly honored to have my work on the CSCE604135 Web Search & Information Retrieval course featured by Pak Alfan. The challenge was to move beyond high-level libraries and build a search system from the ground up.

This project was a deep dive into the engineering trade-offs of Information Retrieval. I focused on balancing indexing speed, storage efficiency, and retrieval accuracy.

### Dual Indexing Strategies
I implemented both BSBI (Block-Sort-Based Indexing) and SPIMI (Single-Pass In-Memory Indexing). This allowed me to compare fixed-block memory usage against more dynamic, memory-efficient sequential processing.

### Bit-Level Compression
To minimize disk footprint, I built custom codecs for Elias-Gamma Coding and Variable Byte Encoding (VBE). My benchmarks showed that bit-level universal coding significantly outperforms standard 32-bit storage, which is crucial for scaling to large document collections.

### Dictionary Optimization
Navigating the vocabulary efficiently is key. I utilized Patricia Trees to manage the dictionary, visualizing the prefix-based structure to ensure fast term lookups. To truly understand the prefix-sharing and structure of the entire vocabulary, I generated three distinct interactive visualizations for learning purposes:

{{< img src="patricia-tree.png" width="300px" caption="Patricia Tree Visualization" >}}


### Hybrid Retrieval (Sparse + Dense)
While traditional BM25 is great, I pushed the project further by integrating LSI (Latent Semantic Indexing) and FAISS (Facebook AI Similarity Search). By using Randomized Truncated SVD and HNSW/IVF indexing, the engine provides semantic search capabilities with a ~9.3x speedup over brute-force methods.

### Interactive UI
To tie it all together, I developed a Flask-based frontend, allowing for real-time query testing across all implemented backends.


### Evaluation
Using metrics like NDCG, MAP, and RBP, I verified that the LSI+FAISS approach provided the highest ranking quality and efficiency across the board.


