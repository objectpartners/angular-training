describe('Form directives', function () {
  
  var expect = chai.expect;

  var element, 
    $scope,
    $compile,
    $httpBackend;

  beforeEach(module(
    'form.directives',
    'ngResource',
    'assets/templates/common/form/form-header.html',
    'assets/templates/common/form/fields/field-wrapper.html',
    'assets/templates/common/form/fields/static-field.html'
  ));

  beforeEach(inject(function($rootScope, _$compile_, _$httpBackend_, $injector) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  describe('tszFormSectionHeader', function () {

    beforeEach(function () {
      $scope.headerName = 'My Header';
      $scope.content = 'My Content';

      element = angular.element(
        '<div tsz-form-section-header header="{{headerName}}">' +
        '   <p>{{content}}</p>' +
        '</div>');

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    describe('header attribute', function() {
      it('should set the header content within the directive template', function () {
        expect(element.find('h4').text()).to.equal('My Header');
      });
      it('should respond to changes', function () {
        expect(element.find('h4').text()).to.equal('My Header');
        $scope.$apply(function() {
          $scope.headerName = 'My Updated Header';
        });
        expect(element.find('h4').text()).to.equal('My Updated Header');
      });
    });
    
    describe('transcluded contents', function() {
      it('should transclude the directive element contents', function () {
        expect(element.find('p').text()).to.equal('My Content');
      });
      it('should respond to changes', function () {
        expect(element.find('p').text()).to.equal('My Content');
        $scope.$apply(function() {
          $scope.content = 'My Updated Content';
        });
        expect(element.find('p').text()).to.equal('My Updated Content');
      });
    });

    
  });

  describe('tszFieldWrap', function () {

    beforeEach(function () {
      $scope.inputId = "my-input-id";
      $scope.labelCol = "5";
      $scope.fieldCol = "8";
      $scope.label = "My Label";

      element = angular.element(
      '<div tsz-field-wrap ' +
        'input-id="{{inputId}}"' +
        'label-col="{{labelCol}}"' +
        'field-col="{{fieldCol}}"' +
        'label="{{label}}"'+
        '>' +
      '</div>'
      );

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    describe('input-id attribute', function() {
      it('should set the "for" attribute of the label', function() {
        expect(element.find('label').attr('for')).to.equal('my-input-id');
      });
      it('should respond to changes', function() {
        expect(element.find('label').attr('for')).to.equal('my-input-id');
        $scope.$apply(function() {
          $scope.inputId = "my-updated-id";
        });
        expect(element.find('label').attr('for')).to.equal('my-updated-id');
      });
    });

    describe('label-col attribute', function() {
      it('should set the number specified by the attribute', function() {
        expect(element.find('label').hasClass('col-sm-5')).to.be.true;
      });
      it('should respond to changes', function() {
        $scope.$apply(function() {
          $scope.labelCol = "10";
        });
        expect(element.find('label').hasClass('col-sm-10')).to.be.true;
      });
    });

    describe('field-col attribute', function() {
      it('should set the number specified by the attribute', function() {
        expect(element.find('div').hasClass('col-sm-8')).to.be.true;
      });
      it('should respond to changes', function() {
        $scope.$apply(function() {
          $scope.fieldCol = "10";
        });
        expect(element.find('div').hasClass('col-sm-10')).to.be.true;
      });
    });

    describe('label attribute', function() {
      it('should set the label contents', function() {
        expect(element.find('label').text()).to.equal('My Label');
      });
      it('should respond to changes', function() {
        $scope.$apply(function() {
          $scope.label = "My Updated Label";
        });
        expect(element.find('label').text()).to.equal('My Updated Label');
      });
    });

    it('should be a passing spec', function () {
      expect(true).to.be.true;
    });
  });

  describe('tszStaticField', function () {
    beforeEach(function () {
      element = angular.element('<div tsz-static-field></div>');

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    it('should be a passing spec', function () {
      expect(true).to.be.true;
    });
  });
});