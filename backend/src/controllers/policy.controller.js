
import * as pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { ingestPolicy } from '../services/policyIngestion.service.js';

export async function uploadPolicy(req, res, next) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: 'Please upload a PDF or DOCX policy file.',
      });
    }

    // Temporary company ID for task testing.
    const companyId = req.body.companyId || 'test-company';

    let extractedText = '';

    if (file.mimetype === 'application/pdf') {
      const parser = new pdfParse.PDFParse({
        data: file.buffer,
      });

      try {
        const parsed = await parser.getText();
        extractedText = parsed.text;
      } finally {
        await parser.destroy();
      }
    } else if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const parsed = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      extractedText = parsed.value;
    } else {
      return res.status(400).json({
        message: 'Only PDF and DOCX files are supported.',
      });
    }

    if (!extractedText || !extractedText.trim()) {
      return res.status(400).json({
        message: 'No readable text found in the uploaded policy file.',
      });
    }

    const result = await ingestPolicy({
      text: extractedText,
      fileName: file.originalname,
      companyId,
    });

    return res.status(201).json({
      message: 'Policy uploaded and indexed successfully.',
      ...result,
    });
  } catch (error) {
    next(error);
  }
}
