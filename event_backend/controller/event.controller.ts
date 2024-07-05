import { Request, Response, NextFunction } from 'express';
import { eventService } from '../services.ts/event.services';
import { AuthService } from '../services.ts/auth.services';
import { errorHandler } from '../middleware/errorHandler';

const authService = new AuthService();
class EventController {
  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to fetch events', error: error.message });
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.id;
      const event = await eventService.getEventById(eventId);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to fetch event', error: error.message });
    }
  }

  async createEvent(req: Request, res: Response): Promise<void> {
    try {
        const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];
        const userId=await authService.getUserId(authHeader)
        const eventData = req.body;
     
      const event = await eventService.createEvent(eventData, userId);
      res.status(201).json(event);
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to create event', error: error.message });
    }
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.id;
      const eventData = req.body;
      const updatedEvent = await eventService.updateEvent(eventId, eventData);
      if (updatedEvent) {
        res.status(200).json(updatedEvent);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to update event', error: error.message });
    }
  }

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.id;
      const deletedEvent = await eventService.deleteEvent(eventId);
      if (deletedEvent) {
        res.status(200).json({ message: 'Event deleted successfully' });
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to delete event', error: error.message });
    }
  }

  async registerForEvent(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const eventId = req.params.id;
      const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];
        const userId=await authService.getUserId(authHeader) 

      await eventService.registerForEvent(eventId, userId);
      res.status(200).json({ message: 'Registered for event successfully' });
    } catch (err:any) {
        errorHandler(err,req,res,next)
    }
  }
}

export const eventController = new EventController();
