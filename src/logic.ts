interface SkeletonElementProps {
    id: number;
    title: string;
    genre: string;
    rating: number;
    thumbnail: string;
    short_description: string;
}

interface SystemRequirementsSpec {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
}

interface SystemRequirements {
    minimum: SystemRequirementsSpec;
    recommended: SystemRequirementsSpec;
}

interface Game {
    id: number;
    title: string;
    genre: string;
    developer: string;
    publisher: string;
    platforms: string[];
    release_date: string;
    rating: number;
    price: number;
    description: string;
    thumbnail: string;
    system_requirements: SystemRequirements;
    tags: string[];
}

export class Logic {
    private API: string;
    private gridElement: HTMLDivElement | null;
    private modalWindowsElement: HTMLDivElement | null;


    constructor() {
        this.API = "https://udavodav.github.io/simple-api-game/games.json";
        this.gridElement = document.querySelector("#grid");
        this.modalWindowsElement = document.querySelector("#modalWindows");

        document.addEventListener("DOMContentLoaded", () => {
            if (!this.modalWindowsElement) return null;
            this.rendering(this.API)

            this.modalWindowsElement.addEventListener("click", () => {
                if (!this.modalWindowsElement) return null;
                this.modalWindowsElement.style.display = "none";
            })
        })
    }

    private skeletonElemnet(
        {
            id,
            title,
            genre,
            rating,
            thumbnail,
            short_description
        }: SkeletonElementProps
    ): string {
        return `
      <div class="block" id="block-${id}" data-id="${id}">
        <img class="thumbnail" src="${thumbnail}" alt="photo">
        <div class="info">
          <h2 class="title">${title}</h2>
          <p class="genre">${genre}</p>
        </div>
        <h3 class="short_description">${short_description}</h3>
        <p class="rating">${rating}</p>
      </div>
    `
    }

    private async rendering(API: string) {
        try {
            if (!this.gridElement) return null;
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const post = await response.json();

            for (const key in post) {
                this.gridElement.innerHTML += this.skeletonElemnet(post[key]);
            }

            for (let i = 0; i < this.gridElement.children.length; i++) {
                this.gridElement.children[i].addEventListener('click', () => {
                    this.modalWindows(i + 1)
                })


            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    private async modalWindows(id: number) {
        try {
            if (!this.modalWindowsElement) return null;
            const response = await fetch(`https://udavodav.github.io/simple-api-game/games/${id}.json`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const post = await response.json();
            this.modalWindowsElement.style.display = "block";
            this.modalWindowsElement.innerHTML = this.createModalWindow(post)
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    private createModalWindow(
        {
            id,
            title,
            genre,
            developer,
            publisher,
            platforms,
            release_date,
            rating,
            price,
            description,
            thumbnail,
            system_requirements: {minimum, recommended},
            tags,
        }: Game): string {
        console.log(thumbnail)
        return `
          <div class="modal" data-modal-id="${id}">
            <div class="modal__content">
              <img class="modal__image" src="${thumbnail}" alt="${title}">
        
              <div class="modal__body">
                <div class="modal__header">
                  <h2 class="modal__title">${title}</h2>
                  <span class="modal__rating">${rating}</span>
                </div>
        
                <div class="modal__meta">
                  <span class="modal__genre">${genre}</span>
                  <span class="modal__price">$${price}</span>
                </div>
        
                <p class="modal__company">${developer} / ${publisher}</p>
                <p class="modal__date">Дата выхода: ${release_date}</p>
                <p class="modal__platforms">Платформы: ${platforms.join(', ')}</p>
        
                <p class="modal__description">${description}</p>
        
                <div class="modal__requirements">
                  <div class="modal__req">
                    <h3>Минимум</h3>
                    <p>${minimum.os}</p>
                    <p>${minimum.processor}</p>
                    <p>${minimum.memory}</p>
                    <p>${minimum.graphics}</p>
                    <p>${minimum.storage}</p>
                  </div>
                  <div class="modal__req">
                    <h3>Рекомендуется</h3>
                    <p>${recommended.os}</p>
                    <p>${recommended.processor}</p>
                    <p>${recommended.memory}</p>
                    <p>${recommended.graphics}</p>
                    <p>${recommended.storage}</p>
                  </div>
                </div>
        
                <ul class="modal__tags">
                  ${tags.map((tag) => `<li>${tag}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
    }
}