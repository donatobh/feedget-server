import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
  
interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error ('Type is required.');
    }

    if (!comment) {
      throw new Error ('Type is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div styles="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<div styles="background-color: #c8c8c8c8; color: #000; border-radius: 8px">`,
            `<p><b>Tipo de feedback:</b> ${type}</p>`,
          `</div>`,
          `<div>`,
            `<p><b>Comentário:</b> ${comment}</p>`,
          `</div>`,
          `<div>`,
            `<p><b>Screenshot:</b></p>`,
            `<img src="${screenshot}" />`,
          `</div>`,
        `</div>`
      ].join('\n'),
    })
  }
}