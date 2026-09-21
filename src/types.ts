import type { AttachmentBuilder, Message } from 'discord.js';
import type { Marka } from './branding';
import type { RenderMessageContext } from './generator';

export type AttachmentTypes = 'audio' | 'video' | 'image' | 'file';

export enum ExportReturnType {
  Buffer = 'buffer',
  String = 'string',
  Attachment = 'attachment',
}

export type ObjectType<T extends ExportReturnType> = T extends ExportReturnType.Buffer
  ? Buffer
  : T extends ExportReturnType.String
    ? string
    : AttachmentBuilder;

export type GenerateFromMessagesOptions<T extends ExportReturnType> = Partial<{
  /**
   * The type of object to return
   * @default ExportReturnType.ATTACHMENT
   */
  returnType: T;

  /**
   * Downloads images and encodes them as base64 data urls
   * @default false
   */
  saveImages: boolean;

  /**
   * Callbacks for resolving channels, users, and roles
   */
  callbacks: Partial<RenderMessageContext['callbacks']>;

  /**
   * The name of the file to return if returnType is ExportReturnType.ATTACHMENT
   * @default 'transkrypcja-{channel-id}.html'
   */
  filename: string;

  /**
   * Czy pokazać stopkę „Wygenerowano przez discord-html-transcripts”
   * @default false
   */
  poweredBy: boolean;

  /**
   * Tekst stopki. Dostępne znaczniki:
   *   {number}      — liczba zapisanych wiadomości
   *   {wiadomosci}  — odmieniony rzeczownik („wiadomość” / „wiadomości”)
   * @default 'Zapisano {number} {wiadomosci}.'
   */
  footerText: string;

  /**
   * Whether to show the guild icon or a custom icon as the favicon
   * 'guild' - use the guild icon
   * or pass in a url to use a custom icon
   * @default "guild"
   */
  favicon: 'guild' | string;

  /**
   * Whether to hydrate the html server-side
   * @default false - the returned html will be hydrated client-side
   */
  hydrate: boolean;

  /**
   * Wygląd nagłówka i stopki transkrypcji (nazwa, logo, kolory, odnośnik).
   * Podane pola nadpisują ustawienia domyślne LastHub.pl.
   */
  marka: Partial<Marka>;
}>;

export type CreateTranscriptOptions<T extends ExportReturnType> = Partial<
  GenerateFromMessagesOptions<T> & {
    /**
     * The max amount of messages to fetch. Use `-1` to recursively fetch.
     */
    limit: number;

    /**
     * Filter messages of the channel
     * @default (() => true)
     */
    filter: (message: Message<boolean>) => boolean;
  }
>;
