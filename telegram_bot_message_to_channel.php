<?
$botToken=""; //something like 111111:dasdasdsadasdASDxczcasdSDAS
$website="https://api.telegram.org/bot".$botToken;
$chatId="-222111332";
$icon = "\u203c\ufe0f"; //Icons link https://emojiterra.com/categories/ JavaScript & JSON code
$icon_attention = json_decode('"'.$icon.'"');
$message =  $icon_attention." <b>TITLE</b> ".$icon_attention."
<b>Name:</b> Guest
<b>Email:</b> guest@guest.com
<b>Message:</b> Guest message
$params=[
'chat_id'=>$chatId,
'text'=>$message,
'parse_mode'=>'HTML',
];
$ch = curl_init($website . '/sendMessage');
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$result = curl_exec($ch);
curl_close($ch);
?>
