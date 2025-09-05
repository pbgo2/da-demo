# AI/ML Predictor in Your Project

## Overview
The AI/ML predictor is a small neural network implemented with **TensorFlow.js** to estimate a student's likelihood of passing a course based on their grades and progress. It’s designed to be simple, fast, and easy to run entirely in the browser.

## How It Works
1. **Input Data**: Each student has two main features:
   - `grade` – the numeric score in the course.
   - `progress` – the completion percentage of the course.

2. **Model Architecture**:
   - Input layer: 2 neurons (grade, progress)
   - Hidden layers: 
     - First: 8 neurons, ReLU activation  
     - Second: 4 neurons, ReLU activation
   - Output layer: 1 neuron, Sigmoid activation (probability of passing)

            ```
                score = grade * 0.7 + progress * 0.3
                label = score >= 50 ? 1 : 0
            ```


3. **Training**:
   - Uses **synthetic data** generated in-memory.
   - Labels are calculated with a simple weighted rule: `score = 0.7*grade + 0.3*progress`.
   - Trains for 20 epochs using the **Adam optimizer** and **binary crossentropy** loss.

4. **Prediction**:
   - Takes a student's grade and progress.
   - Produces a probability (0–1) of passing.
   - Frontend visualizes results as a pie chart (`Pass` vs `Fail`).


            '''
                    const { predict } = require('./predictor');
                    const probability = await predict(grade, progress);
                    res.json({ probability });
        '''

## Key Concepts
- **Neural Networks**: Models patterns in data through layers of interconnected nodes (neurons).  
- **ReLU Activation**: Allows the network to learn non-linear relationships.  
- **Sigmoid Activation**: Converts outputs to probabilities.  
- **In-Memory Training**: Enables quick testing without saving/loading models.  



# AI/ML Predictor Workflow

Student Data
┌─────────────┐
│ grade │
│ progress │
└─────┬───────┘
│
▼
┌───────────┐
│ Input │
│ Layer (2) │
└─────┬─────┘
│
▼
┌───────────┐
│ Hidden │
│ Layer 1 │
│ (8 neurons│
│ ReLU) │
└─────┬─────┘
│
▼
┌───────────┐
│ Hidden │
│ Layer 2 │
│ (4 neurons│
│ ReLU) │
└─────┬─────┘
│
▼
┌───────────┐
│ Output │
│ Layer (1) │
│ Sigmoid │
└─────┬─────┘
│
▼
┌───────────┐
│ Probability│
│ of Passing │
└─────┬─────┘
│
▼
┌─────────────┐
│ Frontend │
│ Pie Chart │
│ Pass / Fail │
└─────────────┘
