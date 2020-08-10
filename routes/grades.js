import express from 'express';
import manager from '../manager/GradeManager.js';

const router = express.Router();

router.post('/', (req, res) => {
  res.send(manager.CreateGrade(req.body));
  res.end();
});

router.put('/:id', (req, res) => {
  let response = manager.UpdateGrade(req.params.id, req.body);
  if (response === 404) {
    res.status(404).send('Grade não encontrado');
  } else {
    res.send(response);
  }
  res.end();
});

router.delete('/:id', (req, res)=>{
  res.send(manager.DeleteGrade(req.params.id));
  res.end();
})

router.get('/', (req, res) => {
  res.send(manager.GetGrades());
  res.end();
});

router.get('/user/:id', (req, res) => {
  res.send(manager.GetGradeById(parseInt(req.params.id)));
  res.end();
});

router.get('/total-grades', (req, res) => {
  res.send(manager.GetTotalGradeByStudentAndSubject(req.body));
  res.end();
});

router.get('/grades-rate', (req, res) => {
  res.send(manager.GetGradeRateByValueAndSubject(req.body));
  res.end();
});

router.get('/greatest-three-grades', (req, res) => {
  res.send(manager.GetThreeGreatestGradesBySubjectAndType(req.body));
  res.end();
});

export default router;
