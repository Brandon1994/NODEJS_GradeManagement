import fs from 'fs';

const manager = {};
const GradesFilePath = './grades.json';

manager.GetGrades = () => {
  try {
    return JSON.parse(fs.readFileSync(GradesFilePath));
  } catch (err) {
    console.log(err);
  }
};

manager.GetGradeById = (id) => {
  try {
    let data = JSON.parse(fs.readFileSync(GradesFilePath));
    return data.grades.find((g) => g.id === id);
  } catch (err) {
    console.log(err);
  }
};

manager.GetTotalGradeByStudentAndSubject = (obj) => {
  let data = JSON.parse(fs.readFileSync(GradesFilePath));
  let student = obj.student;
  let subject = obj.subject;

  let students = data.grades.filter((g) => g.student === student);
  let subjectsByStudents = students.filter((s) => s.subject === subject);

  let total = 0;

  for (let i = 0; i < subjectsByStudents.length; i++) {
    total = parseInt(subjectsByStudents[i].value) + total;
  }

  return { result: total };
};

manager.GetGradeRateByValueAndSubject = (obj) => {
  let data = JSON.parse(fs.readFileSync(GradesFilePath));
  let subject = obj.subject;
  let type = obj.type;

  let subjects = data.grades.filter((g) => g.subject === subject);
  let subjectsAndType = subjects.filter((s) => s.type === type);

  let total = 0;
  for (let i = 0; i < subjectsAndType.length; i++) {
    total = parseInt(subjectsAndType[i].value) + total;
  }
  return { result: total / subjectsAndType.length };
};

manager.GetThreeGreatestGradesBySubjectAndType = (obj) => {
  let data = JSON.parse(fs.readFileSync(GradesFilePath));
  let subject = obj.subject;
  let type = obj.type;

  let subjects = data.grades.filter((g) => g.subject === subject);
  let subjectsAndType = subjects.filter((s) => s.type === type);

  let threeBiggestValues = subjectsAndType
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);
  return threeBiggestValues;

  //citiesCountArr.sort((a, b) => b.cities - a.cities).slice(0, 5)
};

manager.CreateGrade = (grade) => {
  let data = JSON.parse(fs.readFileSync(GradesFilePath));
  let id = data.nextId;

  let newGrade = {
    id: id,
    student: grade.student,
    subject: grade.subject,
    type: grade.type,
    value: parseInt(grade.value),
    timestamp: new Date(),
  };

  data.nextId = id + 1;
  data.grades.push(newGrade);

  fs.writeFileSync(GradesFilePath, JSON.stringify(data));
  return newGrade;
};

manager.UpdateGrade = (id, grade) => {
  let data = JSON.parse(fs.readFileSync(GradesFilePath));
  let oldGrade = data.grades.find((g) => g.id === parseInt(id));
  let index = data.grades.indexOf(oldGrade);

  if (oldGrade != null || oldGrade != undefined) {
    oldGrade.student = grade.student;
    oldGrade.subject = grade.subject;
    oldGrade.type = grade.type;
    oldGrade.value = grade.value;
    oldGrade.timestamp = new Date();

    data.grades[index] = oldGrade;
    fs.writeFileSync(GradesFilePath, JSON.stringify(data));
    return oldGrade;
  };
  return 404;
};

manager.DeleteGrade = (id) => {
  let data = JSON.parse(fs.readFileSync(GradesFilePath));
  let oldGrade = data.grades.find((g) => g.id === parseInt(id));
  let index = data.grades.indexOf(oldGrade);

  data.grades.splice(index, 1);
  fs.writeFileSync(GradesFilePath, JSON.stringify(data));
};

export default manager;
