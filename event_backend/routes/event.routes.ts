import { Router } from 'express';
import { eventController } from '../controller/event.controller';
import { anyLogedIn } from '../middleware/auth.middleware';  

const router: Router = Router();

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.post('/events', anyLogedIn, eventController.createEvent);
router.put('/events/:id', anyLogedIn, eventController.updateEvent);
router.delete('/events/:id', anyLogedIn, eventController.deleteEvent);
router.post('/events/:id/register', anyLogedIn, eventController.registerForEvent);

export default router;
