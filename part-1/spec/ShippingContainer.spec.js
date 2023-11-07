const hasGetter = require('has-getter');
const Box = require('../Box');
const ShippingContainer = require('../ShippingContainer');

describe('ShippingContainer', () => {
  let boxes = [];
  let shippingContainer;

  beforeEach(() => {
    boxes = [new Box({ weight: 300, type: 'food' }), new Box({ weight: 100, type: 'food' })];

    shippingContainer = new ShippingContainer({
      destination: 'Hawaii',
      boxes,
      maxWeight: 500,
      type: 'food',
    });
  });

  describe('👇 Тесты на наличие атрибутов класса `ShippingContainer`', () => {
    it('У `ShippingContainer` есть атрибут destination', () => {
      expect(shippingContainer.destination).toEqual('Hawaii');
    });

    it('У `ShippingContainer` есть атрибут maxWeight', () => {
      expect(shippingContainer.maxWeight).toEqual(500);
    });

    it('У `ShippingContainer` есть атрибут type', () => {
      expect(shippingContainer.type).toEqual('food');
    });

    it('У `ShippingContainer` есть атрибут boxes', () => {
      expect(shippingContainer.boxes).toEqual(boxes);
    });

    describe('👇 Тесты на проверку заменяемы ли значения вашего `ShippingContainer`', () => {
      beforeEach(() => {
        shippingContainer.maxWeight = 800;
      });

      it('атрибут maxWeight у ShippingContainer меняется', () => {
        expect(shippingContainer.maxWeight).toEqual(800);
      });
    });
  });

  describe('👇 Тесты на работу с атрибутом boxes у `ShippingContainer`', () => {
    describe('📦 геттер currentWeight у `ShippingContainer`', () => {
      describe('когда ShippingContainer пустой', () => {
        let emptyShippingContainer;

        beforeEach(() => {
          emptyShippingContainer = new ShippingContainer({
            destination: 'Borneo',
            boxes: [],
            maxWeight: 500,
            type: 'medicine',
          });
        });

        it('метод класса currentWeight возвращает 0', () => {
          expect(emptyShippingContainer.currentWeight).toEqual(0);
        });
      });
    });

    describe('📦 геттер currentWeight у `ShippingContainer`', () => {
      it('возвращает общий вес коробок', () => {
        expect(hasGetter(shippingContainer, 'currentWeight')).toBe(true);
        expect(shippingContainer.currentWeight).toEqual(400);
      });
    });

    describe('📦 метод addBox у `ShippingContainer` ', () => {
      let newBoxWithFood;

      beforeEach(() => {
        newBoxWithFood = new Box({ weight: 50, type: 'food' });
      });

      describe('в пределах maxWeight можно добавить коробку в boxes', () => {
        it('метод addBox возвращает true в случае если коробка добавлена ', () => {
          expect(shippingContainer.addBox(newBoxWithFood)).toEqual(true);
        });

        it('и добавляет коробку в атрибут boxes у ShippingContainer`', () => {
          shippingContainer.addBox(newBoxWithFood);
          expect(shippingContainer.boxes).toContain(newBoxWithFood);
        });
      });

      describe('когда превышено значение атрибута maxWeight (т.е. когда превышен максимальны вес, с учетом добавления новой коробки)', () => {
        let smallerShippingContainer;

        beforeEach(() => {
          smallerShippingContainer = new ShippingContainer({
            destination: 'Guangzhou',
            boxes,
            maxWeight: 425,
            type: 'food',
          });
        });

        it('возвращает false', () => {
          expect(smallerShippingContainer.addBox(newBoxWithFood)).toEqual(false);
        });

        it('и не добавляет коробку в `ShippingContainer`', () => {
          smallerShippingContainer.addBox(newBoxWithFood);
          expect(smallerShippingContainer.boxes).not.toContain(newBoxWithFood);
        });
      });

      describe('когда тип коробки и тип контейнера не совпадают', () => {
        let fullShippingContainer;

        beforeEach(() => {
          fullShippingContainer = new ShippingContainer({
            destination: 'Corpus Christi',
            boxes,
            maxWeight: 500,
            type: 'electronics',
          });
        });

        it('возвращает false', () => {
          expect(fullShippingContainer.addBox(newBoxWithFood)).toEqual(false);
        });

        it('и не добавляет коробку в `ShippingContainer`', () => {
          fullShippingContainer.addBox(newBoxWithFood);
          expect(fullShippingContainer.boxes).not.toContain(newBoxWithFood);
        });
      });
    });
  });
});
