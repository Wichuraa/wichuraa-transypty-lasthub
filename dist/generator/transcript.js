"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DiscordMessages;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const branding_1 = require("../branding");
const brandHeader_1 = __importDefault(require("./renderers/brandHeader"));
const content_1 = __importStar(require("./renderers/content"));
const message_1 = __importDefault(require("./renderers/message"));
const styles_1 = require("./renderers/components/styles");
/**
 * The core transcript component.
 * Expects window.$discordMessage.profiles to be set for profile information.
 *
 * @param props Messages, channel details, callbacks, etc.
 * @returns
 */
async function DiscordMessages(_a) {
    var _b, _c, _d, _e, _f;
    var { messages, channel, callbacks } = _a, options = __rest(_a, ["messages", "channel", "callbacks"]);
    const marka = (0, branding_1.polaczMarke)(options.marka);
    const nazwaKanalu = channel.isDMBased()
        ? channel.type === discord_js_1.ChannelType.DM
            ? ((_c = (_b = channel.recipient) === null || _b === void 0 ? void 0 : _b.tag) !== null && _c !== void 0 ? _c : 'Nieznany odbiorca')
            : 'Nieznany odbiorca'
        : channel.name;
    const nazwaSerwera = channel.isDMBased() ? 'Wiadomości prywatne' : channel.guild.name;
    return (react_1.default.createElement(discord_components_react_1.DiscordMessages, { style: { minHeight: '100vh' } },
        react_1.default.createElement("style", { dangerouslySetInnerHTML: { __html: styles_1.globalStyles } }),
        react_1.default.createElement(brandHeader_1.default, { marka: marka, kanal: nazwaKanalu, serwer: nazwaSerwera, liczbaWiadomosci: messages.length }),
        react_1.default.createElement(discord_components_react_1.DiscordHeader, { guild: nazwaSerwera, channel: nazwaKanalu, icon: channel.isDMBased() ? undefined : ((_d = channel.guild.iconURL({ size: 128 })) !== null && _d !== void 0 ? _d : undefined) }, channel.isThread() ? (`Wątek w kanale ${(_f = (_e = channel.parent) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : 'nieznanym'}`) : channel.isDMBased() ? (`Wiadomości prywatne`) : channel.isVoiceBased() ? (`Czat tekstowy kanału głosowego ${channel.name}`) : channel.type === discord_js_1.ChannelType.GuildCategory ? (`Kategoria kanałów`) : 'topic' in channel && channel.topic ? (react_1.default.createElement(content_1.default, { content: channel.topic, context: Object.assign({ messages, channel, callbacks, type: content_1.RenderType.REPLY }, options) })) : (`To jest początek kanału #${channel.name}.`)),
        messages.map((message) => (react_1.default.createElement(message_1.default, { message: message, context: Object.assign({ messages, channel, callbacks }, options), key: message.id }))),
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                width: '100%',
                padding: '22px 16px 30px',
                color: '#9a9e92',
                fontSize: '13px',
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                borderTop: `2px solid ${marka.kolor}`,
                marginTop: '18px',
            } },
            react_1.default.createElement("div", null, options.footerText
                ? options.footerText
                    .replaceAll('{number}', messages.length.toString())
                    .replaceAll('{wiadomosci}', (0, branding_1.odmienWiadomosci)(messages.length))
                    .replaceAll('{s}', messages.length > 1 ? 's' : '')
                : `Zapisano ${messages.length} ${(0, branding_1.odmienWiadomosci)(messages.length)}.`),
            marka.stopka ? (react_1.default.createElement("div", { style: { marginTop: '6px', color: marka.kolor, fontWeight: 600 } }, marka.stopka)) : null,
            options.poweredBy ? (react_1.default.createElement("div", { style: { marginTop: '8px', fontSize: '11px', opacity: 0.6 } },
                "Wygenerowano przez",
                ' ',
                react_1.default.createElement("a", { href: "https://github.com/ItzDerock/discord-html-transcripts", style: { color: marka.kolor } }, "discord-html-transcripts"),
                ".")) : null)));
}
//# sourceMappingURL=transcript.js.map