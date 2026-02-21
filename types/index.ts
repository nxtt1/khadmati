import { Timestamp } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    name: string;
    email: string;
    role: 'customer' | 'worker';
    createdAt: string;
}

export interface Job {
    id?: string;
    title: string;
    description: string;
    location: string;
    budget: number;
    status: 'open' | 'assigned' | 'completed';
    customerId: string;
    customerName?: string;
    workerId?: string;
    createdAt: Timestamp | string; // Firestore Timestamp or ISO string
}

export interface Proposal {
    id?: string;
    jobId: string;
    workerId: string;
    workerName: string;
    price: number;
    coverLetter: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Timestamp | string;
}
