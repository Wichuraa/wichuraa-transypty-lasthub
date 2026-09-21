import { DiscordActionRow, DiscordAttachment, DiscordSpoiler } from '@derockdev/discord-components-react';
import {
  ComponentType,
  type ThumbnailComponent,
  type MessageActionRowComponent,
  type TopLevelComponent,
} from 'discord.js';
import React from 'react';
import { parseDiscordEmoji } from '../../utils/utils';
import DiscordSelectMenu from './components/Select Menu';
import DiscordContainer from './components/Container';
import DiscordSection from './components/section/Section';
import DiscordMediaGallery from './components/Media Gallery';
import DiscordSeparator from './components/Spacing';
import DiscordButton from './components/Button';
import DiscordThumbnail from './components/Thumbnail';
import MessageContent from './content';
import { RenderType } from './content';
import type { RenderMessageContext } from '..';
import { ButtonStyleMapping } from './components/styles';

export default function ComponentRow({
  component,
  id,
  context,
}: {
  component: TopLevelComponent;
  id: number;
  context: RenderMessageContext;
}) {
  switch (component.type) {
    case ComponentType.ActionRow:
      return (
        <DiscordActionRow key={id}>
          <>
            {component.components.map((nestedComponent, id) => (
              <Component component={nestedComponent} id={id} key={id} />
            ))}
          </>
        </DiscordActionRow>
      );

    case ComponentType.Container:
      return (
        <DiscordContainer key={id}>
          <>
            {component.components.map((nestedComponent, id) => (
              <ComponentRow component={nestedComponent} id={id} key={id} context={context} />
            ))}
          </>
        </DiscordContainer>
      );

    case ComponentType.File:
      return (
        <>
          {component.spoiler ? (
            <DiscordSpoiler key={component.id} slot="attachment">
              <DiscordAttachment
                type="file"
                key={component.id}
                slot="attachment"
                url={component.file.url}
                alt="Discord Attachment"
              />
            </DiscordSpoiler>
          ) : (
            <DiscordAttachment
              type="file"
              key={component.id}
              slot="attachment"
              url={component.file.url}
              alt="Discord Attachment"
            />
          )}
        </>
      );

    case ComponentType.MediaGallery:
      return <DiscordMediaGallery component={component} key={id} />;

    case ComponentType.Section:
      return (
        <DiscordSection key={id} accessory={component.accessory} id={id}>
          {component.components.map((nestedComponent, id) => (
            <ComponentRow component={nestedComponent} id={id} key={id} context={context} />
          ))}
        </DiscordSection>
      );

    case ComponentType.Separator:
      return <DiscordSeparator key={id} spacing={component.spacing} divider={component.divider} />;

    case ComponentType.TextDisplay:
      // Kontener jest ulozony w kolumne (flex), wiec tresc musi trafic do niego
      // jako JEDEN element blokowy. Bez tego opakowania kazdy wezel inline
      // (emotka, pogrubienie, zwykly tekst) staje sie osobnym elementem flex
      // i laduje w nowej linii.
      return (
        <div key={id} style={{ minWidth: 0, wordBreak: 'break-word' }}>
          <MessageContent content={component.content} context={{ ...context, type: RenderType.NORMAL }} />
        </div>
      );

    default:
      return null;
  }
}

export function Component({
  component,
  id,
}: {
  component: MessageActionRowComponent | ThumbnailComponent;
  id: number;
}) {
  switch (component.type) {
    case ComponentType.Button:
      return (
        <DiscordButton
          key={id}
          type={ButtonStyleMapping[component.style as keyof typeof ButtonStyleMapping]}
          url={component.url ?? undefined}
          emoji={component.emoji ? parseDiscordEmoji(component.emoji) : undefined}
        >
          {component.label}
        </DiscordButton>
      );

    case ComponentType.StringSelect:
    case ComponentType.UserSelect:
    case ComponentType.RoleSelect:
    case ComponentType.MentionableSelect:
    case ComponentType.ChannelSelect:
      return <DiscordSelectMenu key={id} component={component} />;

    case ComponentType.Thumbnail:
      return <DiscordThumbnail key={id} url={component.media.url} />;

    default:
      return undefined;
  }
}
