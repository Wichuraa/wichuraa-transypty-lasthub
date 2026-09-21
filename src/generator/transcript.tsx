import { DiscordHeader, DiscordMessages as DiscordMessagesComponent } from '@derockdev/discord-components-react';
import { ChannelType } from 'discord.js';
import React from 'react';
import type { RenderMessageContext } from '.';
import { odmienWiadomosci, polaczMarke } from '../branding';
import BrandHeader from './renderers/brandHeader';
import MessageContent, { RenderType } from './renderers/content';
import DiscordMessage from './renderers/message';
import { globalStyles } from './renderers/components/styles';

/**
 * The core transcript component.
 * Expects window.$discordMessage.profiles to be set for profile information.
 *
 * @param props Messages, channel details, callbacks, etc.
 * @returns
 */
export default async function DiscordMessages({ messages, channel, callbacks, ...options }: RenderMessageContext) {
  const marka = polaczMarke(options.marka);

  const nazwaKanalu = channel.isDMBased()
    ? channel.type === ChannelType.DM
      ? (channel.recipient?.tag ?? 'Nieznany odbiorca')
      : 'Nieznany odbiorca'
    : channel.name;

  const nazwaSerwera = channel.isDMBased() ? 'Wiadomości prywatne' : channel.guild.name;

  return (
    <DiscordMessagesComponent style={{ minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* nagłówek marki */}
      <BrandHeader marka={marka} kanal={nazwaKanalu} serwer={nazwaSerwera} liczbaWiadomosci={messages.length} />

      <DiscordHeader
        guild={nazwaSerwera}
        channel={nazwaKanalu}
        icon={channel.isDMBased() ? undefined : (channel.guild.iconURL({ size: 128 }) ?? undefined)}
      >
        {channel.isThread() ? (
          `Wątek w kanale ${channel.parent?.name ?? 'nieznanym'}`
        ) : channel.isDMBased() ? (
          `Wiadomości prywatne`
        ) : channel.isVoiceBased() ? (
          `Czat tekstowy kanału głosowego ${channel.name}`
        ) : channel.type === ChannelType.GuildCategory ? (
          `Kategoria kanałów`
        ) : 'topic' in channel && channel.topic ? (
          <MessageContent
            content={channel.topic}
            context={{ messages, channel, callbacks, type: RenderType.REPLY, ...options }}
          />
        ) : (
          `To jest początek kanału #${channel.name}.`
        )}
      </DiscordHeader>

      {/* body */}
      {messages.map((message) => (
        <DiscordMessage message={message} context={{ messages, channel, callbacks, ...options }} key={message.id} />
      ))}

      {/* footer */}
      <div
        style={{
          textAlign: 'center',
          width: '100%',
          padding: '22px 16px 30px',
          color: '#9a9e92',
          fontSize: '13px',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          borderTop: `2px solid ${marka.kolor}`,
          marginTop: '18px',
        }}
      >
        <div>
          {options.footerText
            ? options.footerText
                .replaceAll('{number}', messages.length.toString())
                .replaceAll('{wiadomosci}', odmienWiadomosci(messages.length))
                .replaceAll('{s}', messages.length > 1 ? 's' : '')
            : `Zapisano ${messages.length} ${odmienWiadomosci(messages.length)}.`}
        </div>

        {marka.stopka ? (
          <div style={{ marginTop: '6px', color: marka.kolor, fontWeight: 600 }}>{marka.stopka}</div>
        ) : null}

        {options.poweredBy ? (
          <div style={{ marginTop: '8px', fontSize: '11px', opacity: 0.6 }}>
            Wygenerowano przez{' '}
            <a href="https://github.com/ItzDerock/discord-html-transcripts" style={{ color: marka.kolor }}>
              discord-html-transcripts
            </a>
            .
          </div>
        ) : null}
      </div>
    </DiscordMessagesComponent>
  );
}
