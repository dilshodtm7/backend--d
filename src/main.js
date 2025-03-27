// import express from 'express'
// import { routes } from './routes/routes.js'
// import cors from 'cors'

// const app = express()


// const PORT = 9090

// app.use(cors())
// app.use(express.json())
// app.use('/', routes)

// app.listen(PORT, console.log(`Server running with ${PORT} PORT` ))



import express from 'express';
import { routes } from './routes/routes.js';
import cors from 'cors';
import { Telegraf, Markup } from 'telegraf';

const token = '7719888933:AAFKnPI_842XbY-_nc18rh0UUbwk2EVC7tw';
const bot = new Telegraf(token);

const app = express();
// const webAppUrl = 'https://aviashopbot.vercel.app';
const webAppUrl = 'https://aviashopbot-prod.vercel.app';


const casinoUrl = 'https://1wzyuh.com/casino/list?open=register&p=gmsj';
const Community = 'https://t.me/jet_predict';
const imageUrl = 'https://tgram-ten.vercel.app/aviashop_logo.jpg';

const PORT = 9090;

app.use(cors());
app.use(express.json());
app.use('/', routes);

const userLanguage = new Map();

bot.start(async (ctx) => {
    const languageButtons = [
        [Markup.button.callback('🇺🇸 English', 'lang_en')],
        [Markup.button.callback('🇷🇺 Русский', 'lang_ru')],
        [Markup.button.callback('🇺🇿 O‘zbekcha', 'lang_uz')]
    ];

    await ctx.replyWithChatAction('typing');


    ctx.reply('Tilni tanlang / Choose your language / Выберите язык:', {
        reply_markup: { inline_keyboard: languageButtons }
    });
});

// 🌐 Tilni almashtirish tugmasi ishlashi uchun qo'shildi
bot.action('change_lang', async (ctx) => {
    await ctx.replyWithChatAction('typing');
    await ctx.deleteMessage();

    const languageButtons = [
        [Markup.button.callback('🇺🇸 English', 'lang_en')],
        [Markup.button.callback('🇷🇺 Русский', 'lang_ru')],
        [Markup.button.callback('🇺🇿 O‘zbekcha', 'lang_uz')]
    ];

    await ctx.reply('Tilni tanlang / Choose your language / Выберите язык:', {
        reply_markup: { inline_keyboard: languageButtons }
    });
});

bot.action(['lang_en', 'lang_ru', 'lang_uz'], async (ctx) => {
    const selectedLang = ctx.match[0];
    userLanguage.set(ctx.from.id, selectedLang);

    await ctx.replyWithChatAction('typing');
    await ctx.deleteMessage();

    let buttons;
    let caption;
    const userLangCode = selectedLang.replace('lang_', ''); // 'lang_en' -> 'en'

    // WebApp URL'ga til kodini qo'shish
    const webAppUrlWithLang = `${webAppUrl}?lang=${userLangCode}`;

    if (selectedLang === 'lang_en') {
        buttons = [
            [Markup.button.webApp('🔱 GET SIGNAL 🔱', webAppUrlWithLang)],
            [Markup.button.url('📣 Telegram Channel', Community)],
            [Markup.button.url('🎰 Join Casino', casinoUrl)],
            [Markup.button.callback('🌐 Change Language', 'change_lang')]
        ];
        caption = 'The bot is launched! Click the button below to start the application!';
    } else if (selectedLang === 'lang_ru') {
        buttons = [
            [Markup.button.webApp('🔱 ПОЛУЧАТЬ СИГНАЛ 🔱', webAppUrlWithLang)],
            [Markup.button.url('📣 Телеграм Kанал', Community)],
            [Markup.button.url('🎰 Присоединиться к Казино', casinoUrl)],
            [Markup.button.callback('🌐 Сменить язык', 'change_lang')]
        ];
        caption = 'Бот запущен! Нажмите на кнопку ниже, чтобы запустить приложение!';
    } else if (selectedLang === 'lang_uz') {
        buttons = [
            [Markup.button.webApp('🔱 SIGNAL OLISH 🔱', webAppUrlWithLang)],
            [Markup.button.url('📣 Telegram Kanal', Community)],
            [Markup.button.url('🎰 Kazinoga Qo‘shilish', casinoUrl)],
            [Markup.button.callback('🌐 Tilni almashtirish', 'change_lang')]
        ];
        caption = 'Bot ishga tushdi! Quyidagi tugmani bosing va dasturni ishga tushiring!';
    }

    await ctx.replyWithChatAction('typing');


    await ctx.replyWithPhoto(
        { url: imageUrl },
        {
            caption: caption,
            reply_markup: { inline_keyboard: buttons }
        }
    );
});

bot.launch();
console.log('Bot is running...');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
