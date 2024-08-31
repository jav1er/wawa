export function getLastModAgo(lastModific, dateCurrent) {
  const timeDiff = dateCurrent.getTime() - lastModific;
  const absDiff = Math.abs(timeDiff);

  let previousMs = 0;
  let previousUnit = "";
  let result = "";

  const timeUnits = [
    { unit: "segundo", ms: 1000 },
    { unit: "minuto", ms: 60000 },
    { unit: "hora", ms: 3600000 },
    { unit: "día", ms: 86400000 },
    { unit: "año", ms: 31536000000 },
  ];

  timeUnits.forEach((obj) => {
    if (absDiff < obj.ms) {
      const roundedTimeDiff = Math.round(timeDiff / previousMs);
      //////console.log(roundedTimeDiff);
      result = `${roundedTimeDiff} ${previousUnit}${
        roundedTimeDiff !== 1 ? "s" : ""
      }`;
      return;
    }
    previousMs = obj.ms;
    previousUnit = obj.unit;
  });

  //////console.log(result);
  return result === "Infinity s" ? "1 segundo" : result;
}
//1686329849109
// const lastModific = 1686410449116;
// const dateCurrent = new Date();

// ////console.log("Modificado hace", getLastModAgo(lastModific, dateCurrent));
