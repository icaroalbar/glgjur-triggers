import { middyfy } from "@libs/lambda";
import {
  CustomMessageTriggerEvent,
  CustomMessageTriggerHandler,
} from "aws-lambda";

const handler: CustomMessageTriggerHandler = async (
  event: CustomMessageTriggerEvent
) => {
  if (event.triggerSource === "CustomMessage_AdminCreateUser") {
    const username = event.request.usernameParameter; // Obtém o nome de usuário
    const temporaryPassword = event.request.codeParameter; // Obtém o código, que é a senha temporária

    // Formata a mensagem
    const message = `Welcome to the service. Your user name is ${username}. Your temporary password is ${temporaryPassword}`;

    // Atribui as mensagens para SMS e e-mail
    event.response.smsMessage = message;
    event.response.emailMessage = message;
    event.response.emailSubject = "Welcome to the service"; // Assunto do e-mail

    // Retorna o evento modificado
    return event;
  }
};

export const main = middyfy(handler);
