import * as express from 'express';
import { ControllerAdaptor } from '../../controllerAdaptor';
import {
  PostRequestApprovalResponse,
  PostRequestApprovedRequest,
} from '../../../infrastructure/api/model/request/postRequestApprovedAPI';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { ApprovalStatus } from '../../../domain/approvalStatus';

export type PostRequestApprovedControllerDependencies = {
  contentRepository: IContentRepository;
};

export class PostRequestApprovedController extends ControllerAdaptor<PostRequestApprovedRequest> {
  private readonly contentRepository: IContentRepository;
  constructor({
    contentRepository,
  }: PostRequestApprovedControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(req: any): PostRequestApprovedRequest | undefined {
    return PostRequestApprovedRequest.instantiateBy(req);
  }

  async validated(
    reqModel: PostRequestApprovedRequest,
    res: express.Response,
  ): Promise<void> {
    const id = await this.contentRepository.updateApprovalStatus(
      reqModel.contentId,
      ApprovalStatus.APPROVED,
    );
    if (id === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new PostRequestApprovalResponse());
  }
}
