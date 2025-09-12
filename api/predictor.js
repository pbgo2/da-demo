// // backend/predictor.js
// const tf = require('@tensorflow/tfjs');

// let model;

// async function initModel() {
//   if (model) return model;

//   console.log("⚡ Initializing in-memory ML model...");

//   // === Synthetic training data ===
//   const inputs = [];
//   const labels = [];
//   for (let i = 0; i < 500; i++) {
//     const grade = Math.floor(Math.random() * 101);
//     const progress = Math.floor(Math.random() * 101);
//     const score = grade * 0.7 + progress * 0.3;
//     const label = score >= 50 ? 1 : 0;
//     inputs.push([grade, progress]);
//     labels.push(label);
//   }

//   const xs = tf.tensor2d(inputs);         // [500, 2]
//   const ys = tf.tensor2d(labels, [500, 1]); // [500, 1]

//   // === Simple neural network ===
//   model = tf.sequential();
//   model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [2] }));
//   model.add(tf.layers.dense({ units: 4, activation: 'relu' }));
//   model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

//   model.compile({
//     optimizer: tf.train.adam(0.01),
//     loss: 'binaryCrossentropy',
//     metrics: ['accuracy'],
//   });

//   await model.fit(xs, ys, { epochs: 20, batchSize: 16, shuffle: true });
//   console.log("✅ ML model trained in memory");
//   return model;
// }

// async function predict(grade, progress) {
//   const mdl = await initModel();
//   const input = tf.tensor2d([[grade, progress]]);
//   const pred = mdl.predict(input);
//   const prob = (await pred.data())[0];
//   return prob;
// }

// module.exports = { initModel, predict };


// backend/predictor.js
const tf = require('@tensorflow/tfjs');

let model;

export async function initModel() {
  if (model) return model;

  console.log("⚡ Initializing in-memory ML model...");

  // === Synthetic training data ===
  const inputs = [];
  const labels = [];
  for (let i = 0; i < 500; i++) {
    const grade = Math.floor(Math.random() * 101);
    const progress = Math.floor(Math.random() * 101);
    const score = grade * 0.7 + progress * 0.3;
    const label = score >= 50 ? 1 : 0;
    inputs.push([grade, progress]);
    labels.push(label);
  }

  const xs = tf.tensor2d(inputs);         // [500, 2]
  const ys = tf.tensor2d(labels, [500, 1]); // [500, 1]

  // === Simple neural network ===
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [2] }));
  model.add(tf.layers.dense({ units: 4, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  await model.fit(xs, ys, { epochs: 20, batchSize: 16, shuffle: true });
  console.log("✅ ML model trained in memory");
  return model;
}

export default async function predict(grade, progress) {
  const mdl = await initModel();
  const input = tf.tensor2d([[grade, progress]]);
  const pred = mdl.predict(input);
  const prob = (await pred.data())[0];
  return prob;
}

// module.exports = { initModel, predict };
