<?php

require_once 'amocrm.phar';

$afc = htmlspecialchars($_POST['afc'], ENT_QUOTES);
$ibc = htmlspecialchars($_POST['ibc'], ENT_QUOTES);

$strawberry = htmlspecialchars($_POST['strawberry'], ENT_QUOTES);
$mint = htmlspecialchars($_POST['mint'], ENT_QUOTES);
$chocolate = htmlspecialchars($_POST['chocolate'], ENT_QUOTES);
$cherry = htmlspecialchars($_POST['cherry'], ENT_QUOTES);

$firstName = htmlspecialchars($_POST['name'], ENT_QUOTES);
$lastName = htmlspecialchars($_POST['lastname'], ENT_QUOTES);
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES);
$email = htmlspecialchars($_POST['email'], ENT_QUOTES);
$comment = htmlspecialchars($_POST['comment'], ENT_QUOTES);

$address = htmlspecialchars($_POST['address'], ENT_QUOTES);
$room = htmlspecialchars($_POST['room'], ENT_QUOTES);
$delivery = htmlspecialchars($_POST['delivery'], ENT_QUOTES);
$payment = htmlspecialchars($_POST['payment'], ENT_QUOTES);





try {
    // Создание клиента
    $amo = new \AmoCRM\Client('smartlb', 'rodicheva@inbox.ru', '35733357dc4b3191a338bbcf778ec0f6');


    // Получение экземпляра модели для работы с аккаунтом
    $account = $amo->account;
    print_r($account->apiCurrent());

    $lead = $amo->lead;
    $lead['name'] = 'Тестовая сделка';
    $lead->addCustomField(406611, $afc);
    $lead->addCustomField(406639, $ibc);
    $lead->addCustomField(364227, $address . ', квартира ' . $room);
    $lead->addCustomField(406613, $delivery);
    $lead->addCustomField(403127, $payment);
    $lead->addCustomField(403451, $strawberry);
    $lead->addCustomField(403453, $mint);
    $lead->addCustomField(403455, $chocolate);
    $lead->addCustomField(403457, $cherry);
    $lead->addCustomField(397637, $comment);
    $id = $lead->apiAdd();


    $contact = $amo->contact;
    $contact['name'] = $firstName . ' ' . $lastName;
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