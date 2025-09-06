// bot.js

require('dotenv').config();

const { Telegraf } = require('telegraf');

const express = require('express');

const path = require('path');


const bot = new Telegraf(process.env.BOT_TOKEN);

const app = express();

const PORT = process.env.PORT || 10000;


// Servir la mini app web

app.use(express.static(path.join(__dirname, 'public')));


// Comando /start

bot.start((ctx) => {
  const webAppUrl = process.env.RENDER_URL;
  
ctx.reply('¡Bienvenido a la tienda!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Abrir tienda ??', web_app: { url: webAppUrl } }]
      ]
    }
  });

});


// Recibir pedido desde la mini app

bot.on('web_app_data', (ctx) => {
  const data = ctx.webAppData.data;
  
ctx.reply(`?? Pedido recibido:\n${JSON.stringify(data, null, 2)}`);

});


// Iniciar bot y servidor

bot.launch();


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
