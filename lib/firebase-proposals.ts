import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHPHmyh-9VFsNnqDXga05QbgUTbV0Oduk",
  authDomain: "xtriam-proposals.firebaseapp.com",
  projectId: "xtriam-proposals",
  storageBucket: "xtriam-proposals.firebasestorage.app",
  messagingSenderId: "1006795896327",
  appId: "1:1006795896327:web:2a9efcbe940dcc831d9ca2",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig, "proposals") : getApps().find(a => a.name === "proposals") || initializeApp(firebaseConfig, "proposals");
const db = getFirestore(app);

// --- Types ---

export interface ProposalComment {
  id: string;
  proposalCode: string;
  sectionId: string;
  viewerId: string;
  viewerName: string;
  viewerAvatar: string;
  viewerRole: "client" | "owner" | "contributor";
  text: string;
  likes: string[]; // array of viewerIds who liked
  createdAt: Date;
  parentId: string | null; // for threaded replies
}

// --- Comments ---

export async function addComment(data: {
  proposalCode: string;
  sectionId: string;
  viewerId: string;
  viewerName: string;
  viewerAvatar: string;
  viewerRole: "client" | "owner" | "contributor";
  text: string;
  parentId?: string;
}) {
  return addDoc(collection(db, "proposal_comments"), {
    ...data,
    parentId: data.parentId || null,
    likes: [],
    createdAt: serverTimestamp(),
  });
}

export function subscribeToComments(
  proposalCode: string,
  sectionId: string,
  callback: (comments: ProposalComment[]) => void
): Unsubscribe {
  const q = query(
    collection(db, "proposal_comments"),
    where("proposalCode", "==", proposalCode),
    where("sectionId", "==", sectionId),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const comments: ProposalComment[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate() || new Date(),
      })) as ProposalComment[];
      callback(comments);
    },
    (error) => {
      console.error("[Comments] Firestore listener error:", error.code, error.message);
    }
  );
}

export async function toggleLike(commentId: string, viewerId: string, currentlyLiked: boolean) {
  const ref = doc(db, "proposal_comments", commentId);
  await updateDoc(ref, {
    likes: currentlyLiked ? arrayRemove(viewerId) : arrayUnion(viewerId),
  });
}

// --- View tracking ---

export async function trackView(data: {
  proposalCode: string;
  sectionId: string;
  viewerId: string;
  viewerName: string;
}) {
  return addDoc(collection(db, "proposal_views"), {
    ...data,
    timestamp: serverTimestamp(),
  });
}
