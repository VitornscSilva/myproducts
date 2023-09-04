export default interface AuthRequests extends Request {
  user?: {
    id: string;
  };
}