import { writeFile } from 'fs/promises';
import moment from 'moment';

const isValidMultiple = (given: number, multiple: number) => {
  return (given * 10) % (multiple * 10) === 0
};

const validate = (transaction: any) => {
  const result: any = {
    ok: false,
    balance: 0,
    reasons: []
  }

  for (let i = 0; i < transaction.transformations.length; i++) {
    const transformation = transaction.transformations[i];
    const isValidPartNum = transaction.transformations[0].partNum === transformation.partNum;
    const isValidSize = transformation.size >= 3 && transformation.size <= 12;
    const isValidMultipleSize = isValidMultiple(transformation.size, 0.3);


    if (!isValidPartNum) {
      result.reasons.push({
        item: i,
        message: 'Invalid partNum'
      })
    };

    if (!isValidSize) {
      result.reasons.push({
        item: i,
        message: 'Invalid Size'
      })
    };

    if (!isValidMultipleSize) {
      result.reasons.push({
        item: i,
        message: 'Invalid size not increment of 0.3'
      })
    };

    if (isValidPartNum && isValidSize && isValidMultipleSize) {
      result.balance += transformation.size * transformation.qty
    };
  };

  if (result.reasons.length == 0) {
    result.ok = true
  };

  return result
};

export const determineTransaction = (transactions: any, isTest?: boolean) => {
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i]
    const validationResult = validate(transaction)
    transaction.isValid = validationResult.ok
    transaction.balance = validationResult.balance
    transaction.errorReason = validationResult.reasons
  };

  if(isTest) {
    writeFile(`./src/data/output-data-${moment().format('YYYYMMMDD-h:mm:ssa')}.json`, JSON.stringify(transactions))
  };

  return transactions;
}