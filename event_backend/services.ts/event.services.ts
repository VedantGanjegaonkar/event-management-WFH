import { Event, IEvent } from '../model/event.model';
import { IUser } from '../model/user.model';

class EventService {
  async getAllEvents(): Promise<IEvent[]> {
    return await Event.find().populate('createdBy').populate('participants').exec();
  }

  async getEventById(eventId: string): Promise<IEvent | null> {
    return await Event.findById(eventId).populate('createdBy').populate('participants').exec();
  }

  async createEvent(eventData: Partial<IEvent>, userId: string): Promise<IEvent> {
    const event = new Event({
      ...eventData,
      createdBy: userId,
    });
    return await event.save();
  }

  async updateEvent(eventId: string, eventData: Partial<IEvent>): Promise<IEvent | null> {
    return await Event.findByIdAndUpdate(eventId, eventData, { new: true }).exec();
  }

  async deleteEvent(eventId: string): Promise<IEvent | null> {
    return await Event.findByIdAndDelete(eventId).exec();
  }

  async registerForEvent(eventId: string, userId: string): Promise<void> {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    if (!event.participants.includes(userId as any)) {
      event.participants.push(userId as any);
      await event.save();
    }
  }
}

export const eventService = new EventService();
