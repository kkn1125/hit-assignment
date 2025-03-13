'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">HIT Restaurant API Server Docs</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="검색어 입력"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>시작하기</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>개요
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>의존성
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>속성
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">모듈</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' : 'data-bs-target="#xs-controllers-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>컨트롤러</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' :
                                            'id="xs-controllers-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' : 'data-bs-target="#xs-injectables-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' :
                                        'id="xs-injectables-links-module-AppModule-2f331f2a0386c7a1094be175b01e3a162655950f19ffbe057ce7c4eb5275c739bcf36bc2be309624d39ffa828607e925dc4ae932ec78da4ba92c1d92540117c8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>컨트롤러</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' :
                                            'id="xs-controllers-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' :
                                        'id="xs-injectables-links-module-AuthModule-b6c585fca0fb2a3dde6bfaf7504adba0dcdd6373238ba546f2b3ba76f69a461c7710dd0fc165ff539405a1c02a6f371017f2f9ea461c015f1d44a2208ef98946"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommonModule-4e24c9730cbf0538455534f208f26cd23e9935bbe04d6752f829ef7e6577e118e144d8e7e872d5c1e4a77a9a183c5065805bdfef4a13135eb81b00ccd8c4134e"' : 'data-bs-target="#xs-injectables-links-module-CommonModule-4e24c9730cbf0538455534f208f26cd23e9935bbe04d6752f829ef7e6577e118e144d8e7e872d5c1e4a77a9a183c5065805bdfef4a13135eb81b00ccd8c4134e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommonModule-4e24c9730cbf0538455534f208f26cd23e9935bbe04d6752f829ef7e6577e118e144d8e7e872d5c1e4a77a9a183c5065805bdfef4a13135eb81b00ccd8c4134e"' :
                                        'id="xs-injectables-links-module-CommonModule-4e24c9730cbf0538455534f208f26cd23e9935bbe04d6752f829ef7e6577e118e144d8e7e872d5c1e4a77a9a183c5065805bdfef4a13135eb81b00ccd8c4134e"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LoggerModule-6c28eff925ffdd4fbe944488e207d5209a752a637b62a11f8c5664ddb752cc1ac7fd54f47ebc54214e68b90e7a6173854a6d91bc8a2c0aae6cc5efdb8fb49027"' : 'data-bs-target="#xs-injectables-links-module-LoggerModule-6c28eff925ffdd4fbe944488e207d5209a752a637b62a11f8c5664ddb752cc1ac7fd54f47ebc54214e68b90e7a6173854a6d91bc8a2c0aae6cc5efdb8fb49027"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-6c28eff925ffdd4fbe944488e207d5209a752a637b62a11f8c5664ddb752cc1ac7fd54f47ebc54214e68b90e7a6173854a6d91bc8a2c0aae6cc5efdb8fb49027"' :
                                        'id="xs-injectables-links-module-LoggerModule-6c28eff925ffdd4fbe944488e207d5209a752a637b62a11f8c5664ddb752cc1ac7fd54f47ebc54214e68b90e7a6173854a6d91bc8a2c0aae6cc5efdb8fb49027"' }>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MenusModule.html" data-type="entity-link" >MenusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' : 'data-bs-target="#xs-controllers-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>컨트롤러</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' :
                                            'id="xs-controllers-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' }>
                                            <li class="link">
                                                <a href="controllers/MenusController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenusController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' : 'data-bs-target="#xs-injectables-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' :
                                        'id="xs-injectables-links-module-MenusModule-7045b7a1fc3ebf7e943a1bcf4455c289dd572db5bd1901ea60f145e10f3bfb978b7f2ff903abcdbde942d74f40480a9a90e725877b4664bd5e2d0c47a0144343"' }>
                                        <li class="link">
                                            <a href="injectables/MenusService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenusService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservationsModule.html" data-type="entity-link" >ReservationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' : 'data-bs-target="#xs-controllers-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>컨트롤러</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' :
                                            'id="xs-controllers-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' }>
                                            <li class="link">
                                                <a href="controllers/ReservationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' : 'data-bs-target="#xs-injectables-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' :
                                        'id="xs-injectables-links-module-ReservationsModule-09fd42b2617b2747e8788e1bbc4b62b21f733c6c1631f8355a16218b0448fdb244052a9090b869dcc584718fd732855c9088ff051553e9490371ebc89b639db2"' }>
                                        <li class="link">
                                            <a href="injectables/ReservationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RestaurantsModule.html" data-type="entity-link" >RestaurantsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' : 'data-bs-target="#xs-controllers-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>컨트롤러</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' :
                                            'id="xs-controllers-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' }>
                                            <li class="link">
                                                <a href="controllers/RestaurantsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RestaurantsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' : 'data-bs-target="#xs-injectables-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' :
                                        'id="xs-injectables-links-module-RestaurantsModule-890a33f3692cd09dfdb7d54bb8646f10218ea87eeaee9733cb952b2b883c288267258c6e391b4e342418450264e12c9b5a7fa4969c961511114ba76608008918"' }>
                                        <li class="link">
                                            <a href="injectables/RestaurantsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RestaurantsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>컨트롤러</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' :
                                            'id="xs-controllers-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' :
                                        'id="xs-injectables-links-module-UsersModule-9d6c2dd8d84f95f86c3b9921697e4dc8458a3d5a92d12b2ea22fae76868a649e2c2104f93c4c8681964176616f8dd7490c3189a7739c1146650fc5b0349641fc"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilModule.html" data-type="entity-link" >UtilModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UtilModule-e71815af932dac221e08fe9083bded7f326c02cb257358b5571fd8bb019cf26526a112d14cbfe258641e27ef4293320bb00706d8acaac310ce242e57e3b3e0e7"' : 'data-bs-target="#xs-injectables-links-module-UtilModule-e71815af932dac221e08fe9083bded7f326c02cb257358b5571fd8bb019cf26526a112d14cbfe258641e27ef4293320bb00706d8acaac310ce242e57e3b3e0e7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UtilModule-e71815af932dac221e08fe9083bded7f326c02cb257358b5571fd8bb019cf26526a112d14cbfe258641e27ef4293320bb00706d8acaac310ce242e57e3b3e0e7"' :
                                        'id="xs-injectables-links-module-UtilModule-e71815af932dac221e08fe9083bded7f326c02cb257358b5571fd8bb019cf26526a112d14cbfe258641e27ef4293320bb00706d8acaac310ce242e57e3b3e0e7"' }>
                                        <li class="link">
                                            <a href="injectables/UtilService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>컨트롤러</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MenusController.html" data-type="entity-link" >MenusController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReservationsController.html" data-type="entity-link" >ReservationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RestaurantsController.html" data-type="entity-link" >RestaurantsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>엔티티</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Menu.html" data-type="entity-link" >Menu</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Reservation.html" data-type="entity-link" >Reservation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ReservationMenu.html" data-type="entity-link" >ReservationMenu</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Restaurant.html" data-type="entity-link" >Restaurant</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>클래스</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateMenuDto.html" data-type="entity-link" >CreateMenuDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationDto.html" data-type="entity-link" >CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationWithPhoneDto.html" data-type="entity-link" >CreateReservationWithPhoneDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRestaurantDto.html" data-type="entity-link" >CreateRestaurantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionResponseFormat.html" data-type="entity-link" >ExceptionResponseFormat</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalExceptionFilter.html" data-type="entity-link" >GlobalExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseFormat.html" data-type="entity-link" >ResponseFormat</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMenuDto.html" data-type="entity-link" >UpdateMenuDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReservationDto.html" data-type="entity-link" >UpdateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRestaurantDto.html" data-type="entity-link" >UpdateRestaurantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BearerParserMiddleware.html" data-type="entity-link" >BearerParserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link" >CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenusService.html" data-type="entity-link" >MenusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseArrayOrOnePipe.html" data-type="entity-link" >ParseArrayOrOnePipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReservationsService.html" data-type="entity-link" >ReservationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestaurantExistsMiddleware.html" data-type="entity-link" >RestaurantExistsMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestaurantsService.html" data-type="entity-link" >RestaurantsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeormService.html" data-type="entity-link" >TypeormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilService.html" data-type="entity-link" >UtilService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>가드</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CheckOwnerGuard.html" data-type="entity-link" >CheckOwnerGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>인터페이스</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CommonResponseFormat.html" data-type="entity-link" >CommonResponseFormat</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>기타</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">함수</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">타입 별칭</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">변수</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>문서 커버리지</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        이 문서는 다음을 이용하여 생성되었습니다 <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});