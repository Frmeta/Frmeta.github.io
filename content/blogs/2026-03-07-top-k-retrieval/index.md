---
title: WAND Opearator Top K Retrieval Visualization
date: 2026-03-07
description: Information Retrieval
---

{{< mp4 src="demo.mp4" >}}

[Demo](https://top-k-retrieval.netlify.app) | [Source code](https://github.com/Frmeta/top-k-retrieval)

This is a static web app I created to visually demonstrate how the WAND (Weak AND) algorithm works for top-k retrieval in information retrieval systems. The goal was to make a traditionally complex algorithm easy to understand through animation and step-by-step walkthroughs.


{{< img src="algo.png" width="50%" caption="WAND iterator algorithm" >}}


This visualization demonstrates algorithm that:
- scans inverted index posting lists
- computes upper bounds
- selects pivots
- prunes documents


To support flexible scenarios, I built the workflow so the execution trace is generated from Python. You can edit the input in manual.py and re-run it to produce a new steps_history.js file containing the guided algorithm steps in JSON format. The HTML then reads that file and animates the state transitions.
This design lets me scale and customize visualizations for different queries and index configurations simply by adjusting the Python data generator — making the project both educational and extensible.




References:
- Efficient Query Evaluation using a Two-Level Retrieval
Process”, by Andrei Z. Broder, D. Carmel, M. Herscovici, A. Soffer, J. Zien