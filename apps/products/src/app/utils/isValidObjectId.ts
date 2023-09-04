import { ObjectId } from "mongodb";

export default function isValidObjectId(id: string) {
  try {
    const objectId = new ObjectId(id);
    return true;
  } catch (error) {
    return false;
  }
}
