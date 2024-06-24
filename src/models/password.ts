import User from './user';

class Password {
    public password: string | null = null;
    public label: string = "";
    public comment: string | null = null;
    public id: string | null = null;
    public createdAt: string | null = null;
    public owner: User | null = null;
}

export default Password;