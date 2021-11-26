import getDisplayTitle from './getDisplaytitle'

describe('getDisplayTitle', ()=> {
    describe('all title enter', () => {
        it('all title enter', ()=> {
            expect(getDisplayTitle('home page', 'settings page' , 'page notification', 'page notification')).toBe('home page settings page page notification page notification')
        })
    })
})