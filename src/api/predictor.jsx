export const predictPerformance = async (grades, progress) => {
  if (!grades || !progress) return null;
  // Calculate average grade and progress
  const gradeVal = grades.split(",").reduce((acc,val)=>{
    return Number(acc)+Number(val);},0) / grades.split(",").length;
  console.log("Average Grade Value:", gradeVal);

  const progressVal = progress.split(",").reduce((acc,val)=>{
    return Number(acc)+Number(val)},0) / progress.split(",").length;
  console.log("Average Progress Value:", progressVal);

  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ grade: gradeVal, progress: progressVal }),
  });
  if (!res.ok) throw new Error("Prediction failed");
  const data = await res.json();

  return [
    { name: "Pass", value: Number((data.probability * 100).toFixed(2)) },
    { name: "Fail", value: Number(((1 - data.probability) * 100).toFixed(2)) },
  ];
};
