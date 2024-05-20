// src/controllers/ValidateEmailController.ts
import { Request, Response } from 'express';
import axios from 'axios';

export class ValidateEmailController {
  public async validateEmails(req: Request, res: Response): Promise<void> {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      res.status(400).send({ error: 'No file uploaded' });
      return;
    }

    const emailAddresses = uploadedFile.buffer.toString('utf8').split(',');

    const validationResults = await Promise.all(
      emailAddresses.map(async (emailAddress) => {
        const trimmedEmail = emailAddress.trim();
        const isValid = await this.validateEmail(trimmedEmail);
        return { emailAddress: trimmedEmail, isValid };
      })
    );

    res.status(200).send(validationResults);
  }

  private async validateEmail(email: string): Promise<boolean> {
    try {
        const apiKey:string="cb08920a4ee841529f135301064959aa";
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`);
      return response.data.is_valid_format.value;
    } catch (error) {
      return false;
    }
  }
}
