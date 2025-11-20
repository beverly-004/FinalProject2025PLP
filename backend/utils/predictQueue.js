export function generatePredictions(queueStatus, queueHistory) {
  // Count last 5 queue entries
  const last = queueHistory.slice(-5);

  // Count occurrences
  let high = last.filter(q => q.status === "High").length;
  let medium = last.filter(q => q.status === "Medium").length;
  let low = last.filter(q => q.status === "Low").length;

  // --- 1. Best time TODAY ---
  let bestToday = "Not available";

  if (queueStatus === "High") bestToday = "8pm - 10pm";
  if (queueStatus === "Medium") bestToday = "4pm - 6pm";
  if (queueStatus === "Low") bestToday = "Now";

  // --- 2. Predict TOMORROW ---
  let predicted = "Not available";

  if (high >= 3) predicted = "Before 9am";
  else if (medium >= 3) predicted = "2pm - 4pm";
  else if (low >= 3) predicted = "10am - 12pm";
  else predicted = "12pm - 2pm"; // neutral default

  return { bestToday, predicted };
}
