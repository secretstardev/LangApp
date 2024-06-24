import * as templates from "../templates";
import { t } from "../i18n";
import {
  JapaneseResultItem,
  ProcessTextResponse,
} from "../interfaces/ProcessTextResponse";
import { state } from "./common";
import { AddToDictionaryRequest } from "../interfaces/AddToDictionaryRequest";
import { ProcessTextRequest } from "../interfaces/ProcessTextRequest";
import { showSnackbar } from "./Snackbar";
import { AddToDictionaryResponse } from "../interfaces/AddToDictionaryResponse";

export class Modal {
  protected shadowElement: HTMLDivElement;
  protected shadowRoot: ShadowRoot;
  protected modalOuter: HTMLDivElement;
  protected modalBody: HTMLDivElement;

  protected bodyClickCallback: (this: Element, ev: MouseEvent) => any;
  protected modalClickCallback: (this: Element, ev: MouseEvent) => any;

  protected currentProcessTextRequest: ProcessTextRequest;
  protected currentProcessTextResponse: ProcessTextResponse;

  protected width = 400;
  protected height = 300;

  protected create() {
    if (this.shadowElement) {
      return;
    }
    this.shadowElement = document.createElement("div");
    document.body.appendChild(this.shadowElement);
    this.shadowRoot = this.shadowElement.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = templates.modalStyles({}) + templates.modal({});
    this.modalOuter = <HTMLDivElement>(
      this.shadowRoot.querySelector("#modalOuter")
    );
    this.modalBody = this.modalOuter.querySelector("#modalBody");

    this.modalClickCallback = (e) => this.modalClick(e);
    this.shadowRoot.addEventListener("click", this.modalClickCallback);
    //this.modalOuter.querySelector('#closeModal').addEventListener('click', e => this.hide());

    this.bodyClickCallback = (e) => this.bodyClick(e);
    document.body.addEventListener("click", this.bodyClickCallback);
  }

  updatePosition(range: Range) {
    let rangePos = range.getBoundingClientRect();
    //let rootNode = range.startContainer.ownerDocument.documentElement;
    let rootNode = document.documentElement;
    let modalX = rangePos.x;
    let offsetY = 10;
    let modalY = rangePos.y + rangePos.height + offsetY;
    let windowWidth = rootNode.clientWidth;
    let windowHeight = rootNode.clientHeight;
    let topMode = false;

    this.width = 480;
    if (modalX + this.width > windowWidth) {
      if (windowWidth > this.width) {
        modalX = windowWidth - this.width;
      } else {
        modalX = 0;
        this.width = Math.max(windowWidth - modalX, 200);
      }
    }
    this.modalOuter.style.left = modalX + rootNode.scrollLeft + "px";

    this.height = Math.max(
      200,
      Math.floor(windowHeight * 0.6),
      Math.min(Math.floor(windowHeight * 0.9), 400)
    );
    if (modalY + this.height > windowHeight) {
      // If top part is bigger than bottom's part
      let topMaxHeight = rangePos.y - offsetY;
      let bottomMaxHeight =
        windowHeight - rangePos.y - rangePos.height - offsetY;
      if (
        bottomMaxHeight < 200 &&
        topMaxHeight > 200 &&
        topMaxHeight > bottomMaxHeight
      ) {
        topMode = true;
        modalY = rangePos.y - (this.height + offsetY);
        if (modalY < 0) {
          this.height = this.height + modalY; // modalY is negative, so we shrink height
          modalY = 0;
        }
      } else {
        this.height = Math.max(200, windowHeight - modalY);
      }
    }
    this.modalOuter.style.top = modalY + rootNode.scrollTop + "px";
    this.modalOuter.style.width = this.width + "px";
    this.modalOuter.style.maxHeight = this.height + "px";
    this.modalOuter.style.height = topMode ? this.height + "px" : "auto";
    this.modalOuter.style.display = "flex";

    document.dispatchEvent(new CustomEvent("langapp-modal-display"));
  }

  showRawHtml(content) {
    this.create();
    this.modalBody.innerHTML = content;
  }

  showText(text) {
    this.showRawHtml(templates.modalText({ text: text }));
  }

  showTranslations(request: ProcessTextRequest, response: ProcessTextResponse) {
    this.currentProcessTextRequest = request;
    this.currentProcessTextResponse = response;
    this.showRawHtml(
      templates.modalTranslation({
        t,
        response,
        request,
      })
    );
  }

  protected modalClick(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      let el = e.target;
      if (el.closest("#closeModal")) {
        this.hide();
      }
      let add = <HTMLElement>el.closest(".button-add");
      if (add) {
        this.clickOnMeaning(add);
      }

      let audio = <HTMLElement>el.closest(".word-audio");
      if (audio) {
        this.clickAudioBtn(audio);
      }
      // let seeAlsoBtn = <HTMLElement>el.closest(".see-also-btn");
      // if (seeAlsoBtn) {
      //   this.seeAlsoTranslates(seeAlsoBtn);
      // }
      // let moreBtn = <HTMLElement>el.closest(".btn-more");
      // if (moreBtn) {
      //   this.moreVariants();
      // }
    }
  }

  protected async clickOnMeaning(el: HTMLElement) {
    let wordEl = <HTMLElement>el.closest(".word-variant");
    let responseEl = <HTMLElement>el.closest(".response");
    if (!wordEl || !responseEl) {
      return;
    }
    let word = <JapaneseResultItem>JSON.parse(wordEl.dataset.word);
    let request: AddToDictionaryRequest = {
      wordId: word.id,
      wordValue: word.value,
      wordType: word.type,
      meaningValue: "",
      contextText: this.currentProcessTextRequest.text,
      contextOffset: this.currentProcessTextRequest.offset,
      contextUrl: this.currentProcessTextRequest.url,
    };
    let response = <AddToDictionaryResponse>(
      await state.apiCall("POST", "dictionaries", request)
    );
    showSnackbar(
      response.success
        ? t("added_to_user_dictionary")
        : t("error_while_adding_to_user_dictionary")
    );
    this.hide();
  }

  protected bodyClick(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (!(e.target.shadowRoot && e.target.shadowRoot == this.shadowRoot)) {
        this.hide();
      }
    }
  }

  hide() {
    if (this.modalBody) {
      this.modalBody.innerHTML = "";
      this.modalOuter.style.display = "none";
      document.dispatchEvent(new CustomEvent("langapp-modal-hide"));
    }
  }

  dispose() {
    document.body.removeChild(this.shadowElement);
    this.shadowElement = null;
    this.shadowRoot.removeEventListener("click", this.modalClickCallback);
    this.modalClickCallback = null;
    document.removeEventListener("click", this.bodyClickCallback);
    this.bodyClickCallback = null;
  }

  seeAlsoTranslates(button: HTMLElement) {
    const entityId = button.getAttribute("data-entity-id");
    this.showTranslations(
      this.currentProcessTextRequest,
      this.currentProcessTextResponse
    );
  }

  moreVariants() {
    this.showTranslations(
      this.currentProcessTextRequest,
      this.currentProcessTextResponse
    );
  }

  protected clickAudioBtn(el: HTMLElement) {
    const audiourls = el.dataset.audiourls;
    let audioUrl = Array.isArray(audiourls) ? audiourls[0] : audiourls;
    if (!audioUrl) return;
    const audioPlayer = this.shadowElement.shadowRoot.querySelector(
      "#audioplayer"
    ) as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.src = audioUrl;
      audioPlayer.play();
    }

    // fetch(audioUrl)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const audioUrl = URL.createObjectURL(blob);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching and playing audio:", error);
    //   });
  }
}
