import { Module, customModule, Container } from '@ijstech/components';
import assets from '@modules/assets';
import ScomBanner from '@scom/scom-banner';

@customModule
export default class Module1 extends Module {
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel>
            <i-scom-banner
                data={{
                    title: 'Title',
                    description: 'Description',
                    backgroundImage: assets.fullPath('img/background.png'),
                    showFooter: false
                }}
                tag={{
                    light: {
                        titleFontColor: '#FF9933',
                        descriptionFontColor: '#ddd',
                        textAlign: 'center'
                    },
                    dark: {
                        titleFontColor: '#FF9933',
                        descriptionFontColor: '#fff',
                        textAlign: 'center'
                    }
                }}
            />
        </i-panel>
    }
}