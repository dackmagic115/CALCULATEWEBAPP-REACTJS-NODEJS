exports.calculateGrade = (input) => {
  if (!isArray(input)) return console.log("error");
  const gradeInfo = input.reduce((acc, curr) => {
    acc.push({
      name: curr.name,
      score: curr.score,
      credit: curr.credit,
      gradeNumber: findGradeNumber(+curr.score),
      gradeAlphabet: findGradeAlphabet(+curr.score),
      totalGradeCreadit: findGradeNumber(+curr.score) * +curr.credit,
    });

    return acc;
  }, []);
  const totalGradeCreadit = findSumTotalGradeCreadit(gradeInfo);
  const totalCredit = findSumCredit(gradeInfo);
  const averageGrade = findAverageGrade(totalCredit, totalGradeCreadit);

  return { averageGrade: averageGrade.toFixed(2), info: gradeInfo };
};

const findSumTotalGradeCreadit = (grade) => {
  if (!isArray(grade)) throw new Error("BROKEN");

  return grade.reduce((acc, curr) => {
    return acc + curr.totalGradeCreadit;
  }, 0);
};

const findSumCredit = (gradeInfo) => {
  if (!isArray(gradeInfo)) throw new Error("BROKEN");

  const totalCredit = gradeInfo.reduce((acc, curr) => {
    return acc + curr.credit;
  }, 0);

  return totalCredit;
};

const findGradeNumber = (score) => {
  if (typeof score !== "number") throw new Error("BROKEN");
  if (score > 100) throw new Error("BROKEN");

  if (score >= 80) return 4;
  if (score <= 79 && score >= 75) return 3.5;
  if (score <= 74 && score >= 70) return 3;
  if (score <= 69 && score >= 65) return 2.5;
  if (score <= 64 && score >= 60) return 2;
  if (score <= 59 && score >= 55) return 1.5;
  if (score <= 54 && score >= 50) return 1;
  if (score < 50) return 0;
};

const findGradeAlphabet = (score) => {
  if (typeof score !== "number") throw new Error("BROKEN");

  if (score > 100) throw new Error("BROKEN");

  if (score >= 84) return "A";
  if (score >= 83 && score <= 78) return "A-";
  if (score >= 77 && score <= 70) return "B";
  if (score >= 69 && score <= 65) return "B-";
  if (score >= 64 && score <= 60) return "C";
  if (score >= 59 && score <= 55) return "C-";
  if (score >= 54 && score <= 50) return "D";
  if (score > 50) return "F";
};

const findAverageGrade = (totalCredit, totalGrade) => {
  return totalGrade / totalCredit;
};

const isArray = (input) => {
  return input instanceof Array && input.length !== 0;
};
