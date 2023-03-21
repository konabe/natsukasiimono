import * as express from 'express';
import { PostSigninController } from '../../../controller/resources/root/postSigninController';
import { UserRepositoryMock } from '../../database/repository/userRepository.mock';
import { UserAuthorizer } from '../../../controller/middleware/authorizer';

const router = express.Router();

router.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

router.post('/signin', async (req: express.Request, res: express.Response) => {
  const userRepository = new UserRepositoryMock();
  new PostSigninController({ userRepository }).invoke(req, res);
});

router.post(
  '/signout',
  new UserAuthorizer({
    allowed: [],
    userRepository: new UserRepositoryMock(),
  }).authenticateUser,
  async (req: express.Request, res: express.Response) => {
    res.status(200).send();
  },
);

export default router;
