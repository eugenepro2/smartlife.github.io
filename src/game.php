<?php

require_once 'amocrm.phar';

$game = htmlspecialchars($_POST['game'], ENT_QUOTES);
$name = htmlspecialchars($_POST['name'], ENT_QUOTES);
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES);
$email = htmlspecialchars($_POST['email'], ENT_QUOTES);


try {
  // Создание клиента
  $amo = new \AmoCRM\Client('smartlb', 'rodicheva@inbox.ru', '35733357dc4b3191a338bbcf778ec0f6');

  // Получение экземпляра модели для работы с аккаунтом
  $account = $amo->account;

  $lead = $amo->lead;
  $lead['name'] = 'Заявка(игра)';
  $lead->addCustomField(397637, $game);
  $id = $lead->apiAdd();


  $contact = $amo->contact;
  $contact['name'] = $name;
  $contact['linked_leads_id'] = $id;
  $contact['responsible_user_id'] = 697344;
  $contact->addCustomField(334761, [
    [$phone, 'WORK'],
  ]);
  $contact->addCustomField(334763, [
    [$email, 'WORK'],
  ]);

  $id2 = $contact->apiAdd();

  

} catch (\AmoCRM\Exception $e) {
  printf('Error (%d): %s' . PHP_EOL, $e->getCode(), $e->getMessage());
}