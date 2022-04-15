import { IsAlphanumeric, IsEAN, IsEmail, IsNotEmpty } from 'class-validator';
import { i18n } from 'src/i18n/translation';

const ShouldNotBeEmpty = (messageCode: string) =>
  IsAlphanumeric(undefined, {
    message: i18n.__(messageCode),
  });

const ShouldContainText = (messageCode: string) =>
  IsNotEmpty({
    message: i18n.__(messageCode),
  });

const ShouldBeEmail = (messageCode: string) =>
  IsEmail(undefined, {
    message: i18n.__(messageCode),
  });

export { ShouldNotBeEmpty, ShouldContainText, ShouldBeEmail };
