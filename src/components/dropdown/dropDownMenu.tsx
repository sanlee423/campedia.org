import {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {DropdownItem, DropdownProps} from './dropDownItem';
import useWindowSize from '@/utils/windowDimensions';

export function DropdownMenu({
  dropdown,
  isLeft = true,
}: {
  dropdown: DropdownProps;
  isLeft: boolean;
}) {
  const {height} = useWindowSize();
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownRef.current !== null) {
      const offsetHeight =
        (dropdownRef.current.firstChild as HTMLElement).offsetHeight ?? 0;

      setMenuHeight(offsetHeight + 100);
    }
  }, [setMenuHeight]);

  function calcHeight(el: HTMLElement) {
    const height = el.offsetHeight + 100;
    setMenuHeight(height);
  }

  useEffect(() => {
    if (document !== null) {
      const dropdownContainer = document.getElementById('dropdown-container');

      if (dropdownContainer) {
        dropdownContainer.style.top = `${height * 0.13}px`;
      }
    }
  }, [height]);

  return (
    <div
      id={'dropdown-container'}
      className={`dropdown dropdown-${isLeft ? 'left' : 'right'}`}
      style={{height: menuHeight ?? 0}}
      ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          {dropdown.menuObj.map(item => {
            return (
              <DropdownItem
                key={item.title}
                link={item.link}
                setActiveMenu={setActiveMenu}
                leftIcon={item.leftIcon}
                rightIcon={item.rightIcon}
                goToMenu={item.goToMenu}>
                {item.title}
              </DropdownItem>
            );
          })}
        </div>
      </CSSTransition>

      {dropdown.subMenuObj &&
        dropdown.subMenuObj.map(items => {
          return (
            <CSSTransition
              key={items.parentTitle}
              in={activeMenu === items.parentTitle}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}>
              <div className="menu">
                <DropdownItem
                  setActiveMenu={setActiveMenu}
                  goToMenu="main"
                  leftIcon={<KeyboardArrowLeftIcon />}>
                  <h2>Go Back</h2>
                </DropdownItem>
                {items.menuObj.map(subItem => {
                  return (
                    <DropdownItem
                      key={subItem.title}
                      setActiveMenu={setActiveMenu}
                      link={subItem.link}
                      leftIcon={subItem.leftIcon}>
                      {subItem.title}
                    </DropdownItem>
                  );
                })}
              </div>
            </CSSTransition>
          );
        })}
    </div>
  );
}
