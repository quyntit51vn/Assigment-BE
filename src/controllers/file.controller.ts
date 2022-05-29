import keys from '../config/env/keys';

export const uploadImage = async (req: any, res: any, next: any) => {
    const { file } = req;
    try {

        res.success(`${keys.ip_host}/` + file.path);
    } catch (error) {
        res.error(error.name, error.message, error.statusCode);
    }
};
