import { DiscordReaction, DiscordReactions, DiscordSystemMessage } from '@derockdev/discord-components-react';
import { MessageType, type GuildMember, type Message, type User } from 'discord.js';
import React from 'react';
import { parseDiscordEmoji } from '../../utils/utils';

export default async function SystemMessage({ message }: { message: Message }) {
  switch (message.type) {
    case MessageType.RecipientAdd:
    case MessageType.UserJoin:
      return (
        <DiscordSystemMessage id={`m-${message.id}`} key={message.id} type="join">
          <JoinMessage member={message.member} fallbackUser={message.author} />
        </DiscordSystemMessage>
      );

    case MessageType.ChannelPinnedMessage:
      return (
        <DiscordSystemMessage id={`m-${message.id}`} key={message.id} type="pin">
          <Highlight color={message.member?.roles.color?.hexColor}>
            {message.author.displayName ?? message.author.username}
          </Highlight>{' '}
          przypiął(-ęła) <i data-goto={message.reference?.messageId}>wiadomość</i> na tym kanale.
          {/* reactions */}
          {message.reactions.cache.size > 0 && (
            <DiscordReactions slot="reactions">
              {message.reactions.cache.map((reaction, id) => (
                <DiscordReaction
                  key={`${message.id}r${id}`}
                  name={reaction.emoji.name!}
                  emoji={parseDiscordEmoji(reaction.emoji)}
                  count={reaction.count}
                />
              ))}
            </DiscordReactions>
          )}
        </DiscordSystemMessage>
      );

    case MessageType.GuildBoost:
    case MessageType.GuildBoostTier1:
    case MessageType.GuildBoostTier2:
    case MessageType.GuildBoostTier3:
      return (
        <DiscordSystemMessage id={`m-${message.id}`} key={message.id} type="boost">
          <Highlight color={message.member?.roles.color?.hexColor}>
            {message.author.displayName ?? message.author.username}
          </Highlight>{' '}
          ulepszył(a) serwer!
        </DiscordSystemMessage>
      );

    case MessageType.ThreadStarterMessage:
      return (
        <DiscordSystemMessage id={`ms-${message.id}`} key={message.id} type="thread">
          <Highlight color={message.member?.roles.color?.hexColor}>
            {message.author.displayName ?? message.author.username}
          </Highlight>{' '}
          rozpoczął(-ęła) wątek: <i data-goto={message.reference?.messageId}>{message.content}</i>
        </DiscordSystemMessage>
      );

    // TODO: implement support for these:
    case MessageType.Default:
    case MessageType.RecipientRemove:
    case MessageType.Call:
    case MessageType.ChannelNameChange:
    case MessageType.ChannelIconChange:
    case MessageType.ChannelFollowAdd:
    case MessageType.GuildDiscoveryDisqualified:
    case MessageType.GuildDiscoveryRequalified:
    case MessageType.GuildDiscoveryGracePeriodInitialWarning:
    case MessageType.GuildDiscoveryGracePeriodFinalWarning:
    case MessageType.ThreadCreated:
    case MessageType.Reply:
    case MessageType.ChatInputCommand:
    case MessageType.GuildInviteReminder:
    case MessageType.ContextMenuCommand:
    case MessageType.AutoModerationAction:
    case MessageType.RoleSubscriptionPurchase:
    case MessageType.InteractionPremiumUpsell:
    case MessageType.StageStart:
    case MessageType.StageEnd:
    case MessageType.StageSpeaker:
    case MessageType.StageRaiseHand:
    case MessageType.StageTopic:
    case MessageType.GuildApplicationPremiumSubscription:
    case MessageType.GuildIncidentAlertModeEnabled:
    case MessageType.GuildIncidentAlertModeDisabled:
    case MessageType.GuildIncidentReportRaid:
    case MessageType.GuildIncidentReportFalseAlarm:
    case MessageType.PurchaseNotification:
    case MessageType.PollResult:
      return undefined;

    default:
      return undefined;
  }
}

export function Highlight({ children, color }: { children: React.ReactNode; color?: string }) {
  return <i style={{ color: color ?? 'white' }}>{children}</i>;
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

export function JoinMessage({ member, fallbackUser }: { member: GuildMember | null; fallbackUser: User }) {
  const randomMessage = allJoinMessages[Math.floor(Math.random() * allJoinMessages.length)];

  return randomMessage
    .split('{user}')
    .flatMap((item, i) => [
      item,
      <Highlight color={member?.roles.color?.hexColor} key={i}>
        {member?.nickname ?? fallbackUser.displayName ?? fallbackUser.username}
      </Highlight>,
    ])
    .slice(0, -1);
}
