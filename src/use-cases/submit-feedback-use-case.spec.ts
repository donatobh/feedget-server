import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async () => {} },
  { sendMail: async () => {} }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64.jpg',
    })).resolves.not.toThrow();  
  });

  it('should be unable to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64.jpg',
    })).rejects.toThrow();  
  });

  it('should be unable to submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64.jpg',
    })).rejects.toThrow();  
  });

  it('should be unable to submit a feedback with a wrong image type', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'base64.jpg',
    })).rejects.toThrow();  
  });
});