"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemMessage;
exports.Highlight = Highlight;
exports.JoinMessage = JoinMessage;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
async function SystemMessage({ message }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    switch (message.type) {
        case discord_js_1.MessageType.RecipientAdd:
        case discord_js_1.MessageType.UserJoin:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `m-${message.id}`, key: message.id, type: "join" },
                react_1.default.createElement(JoinMessage, { member: message.member, fallbackUser: message.author })));
        case discord_js_1.MessageType.ChannelPinnedMessage:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `m-${message.id}`, key: message.id, type: "pin" },
                react_1.default.createElement(Highlight, { color: (_b = (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.color) === null || _b === void 0 ? void 0 : _b.hexColor }, (_c = message.author.displayName) !== null && _c !== void 0 ? _c : message.author.username),
                ' ',
                "przypi\u0105\u0142(-\u0119\u0142a) ",
                react_1.default.createElement("i", { "data-goto": (_d = message.reference) === null || _d === void 0 ? void 0 : _d.messageId }, "wiadomo\u015B\u0107"),
                " na tym kanale.",
                message.reactions.cache.size > 0 && (react_1.default.createElement(discord_components_react_1.DiscordReactions, { slot: "reactions" }, message.reactions.cache.map((reaction, id) => (react_1.default.createElement(discord_components_react_1.DiscordReaction, { key: `${message.id}r${id}`, name: reaction.emoji.name, emoji: (0, utils_1.parseDiscordEmoji)(reaction.emoji), count: reaction.count })))))));
        case discord_js_1.MessageType.GuildBoost:
        case discord_js_1.MessageType.GuildBoostTier1:
        case discord_js_1.MessageType.GuildBoostTier2:
        case discord_js_1.MessageType.GuildBoostTier3:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `m-${message.id}`, key: message.id, type: "boost" },
                react_1.default.createElement(Highlight, { color: (_f = (_e = message.member) === null || _e === void 0 ? void 0 : _e.roles.color) === null || _f === void 0 ? void 0 : _f.hexColor }, (_g = message.author.displayName) !== null && _g !== void 0 ? _g : message.author.username),
                ' ',
                "ulepszy\u0142(a) serwer!"));
        case discord_js_1.MessageType.ThreadStarterMessage:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `ms-${message.id}`, key: message.id, type: "thread" },
                react_1.default.createElement(Highlight, { color: (_j = (_h = message.member) === null || _h === void 0 ? void 0 : _h.roles.color) === null || _j === void 0 ? void 0 : _j.hexColor }, (_k = message.author.displayName) !== null && _k !== void 0 ? _k : message.author.username),
                ' ',
                "rozpocz\u0105\u0142(-\u0119\u0142a) w\u0105tek: ",
                react_1.default.createElement("i", { "data-goto": (_l = message.reference) === null || _l === void 0 ? void 0 : _l.messageId }, message.content)));
        // TODO: implement support for these:
        case discord_js_1.MessageType.Default:
        case discord_js_1.MessageType.RecipientRemove:
        case discord_js_1.MessageType.Call:
        case discord_js_1.MessageType.ChannelNameChange:
        case discord_js_1.MessageType.ChannelIconChange:
        case discord_js_1.MessageType.ChannelFollowAdd:
        case discord_js_1.MessageType.GuildDiscoveryDisqualified:
        case discord_js_1.MessageType.GuildDiscoveryRequalified:
        case discord_js_1.MessageType.GuildDiscoveryGracePeriodInitialWarning:
        case discord_js_1.MessageType.GuildDiscoveryGracePeriodFinalWarning:
        case discord_js_1.MessageType.ThreadCreated:
        case discord_js_1.MessageType.Reply:
        case discord_js_1.MessageType.ChatInputCommand:
        case discord_js_1.MessageType.GuildInviteReminder:
        case discord_js_1.MessageType.ContextMenuCommand:
        case discord_js_1.MessageType.AutoModerationAction:
        case discord_js_1.MessageType.RoleSubscriptionPurchase:
        case discord_js_1.MessageType.InteractionPremiumUpsell:
        case discord_js_1.MessageType.StageStart:
        case discord_js_1.MessageType.StageEnd:
        case discord_js_1.MessageType.StageSpeaker:
        case discord_js_1.MessageType.StageRaiseHand:
        case discord_js_1.MessageType.StageTopic:
        case discord_js_1.MessageType.GuildApplicationPremiumSubscription:
        case discord_js_1.MessageType.GuildIncidentAlertModeEnabled:
        case discord_js_1.MessageType.GuildIncidentAlertModeDisabled:
        case discord_js_1.MessageType.GuildIncidentReportRaid:
        case discord_js_1.MessageType.GuildIncidentReportFalseAlarm:
        case discord_js_1.MessageType.PurchaseNotification:
        case discord_js_1.MessageType.PollResult:
            return undefined;
        default:
            return undefined;
    }
}
function Highlight({ children, color }) {
    return react_1.default.createElement("i", { style: { color: color !== null && color !== void 0 ? color : 'white' } }, children);
}
const allJoinMessages = [
    '{user} dołączył(a) do serwera — miłej gry!',
    '{user} właśnie wszedł(weszła). Wszyscy udawać zajętych!',
    'Witaj, {user}. Rozgość się.',
    '{user} dołączył(a) do drużyny.',
    'Dziki {user} pojawia się!',
    'Szuuu. {user} właśnie wylądował(a).',
    'Trzymajcie się, {user} dołączył(a) do serwera.',
    '{user} zjawił(a) się. Potrzymaj mi napój.',
    'Nadciąga wyzwanie — {user} się pojawił(a)!',
    'To ptak! To samolot! A nie, to tylko {user}.',
    'Witamy na pokładzie, {user}!',
    '{user} jest tu, tak jak głosiła przepowiednia.',
    'Gotowy graczu {user}!',
    'Hej! Słuchaj! {user} dołączył(a)!',
    'Czekaliśmy na Ciebie, {user}.',
    '{user} wbił(a) na serwer. Witamy!',
];
function JoinMessage({ member, fallbackUser }) {
    const randomMessage = allJoinMessages[Math.floor(Math.random() * allJoinMessages.length)];
    return randomMessage
        .split('{user}')
        .flatMap((item, i) => {
        var _a, _b, _c;
        return [
            item,
            react_1.default.createElement(Highlight, { color: (_a = member === null || member === void 0 ? void 0 : member.roles.color) === null || _a === void 0 ? void 0 : _a.hexColor, key: i }, (_c = (_b = member === null || member === void 0 ? void 0 : member.nickname) !== null && _b !== void 0 ? _b : fallbackUser.displayName) !== null && _c !== void 0 ? _c : fallbackUser.username),
        ];
    })
        .slice(0, -1);
}
//# sourceMappingURL=systemMessage.js.map