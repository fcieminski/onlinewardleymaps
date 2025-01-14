import React, { useRef, useEffect, useState } from 'react';
import { owmBuild } from '../../version';
import { ExampleMap } from '../../constants/defaults';
import {
	Alert,
	Modal,
	InputGroup,
	FormControl,
	Button,
	ButtonGroup,
	DropdownButton,
	Dropdown,
} from 'react-bootstrap';

function Controls(props) {
	const [toggleAutoSave, setToggleAutoSave] = useState(false);
	const {
		saveOutstanding,
		isSavedLocally,
		saveMapClick,
		saveMapLocallyClick,
		mutateMapText,
		setMetaText,
		newMapClick,
		downloadMapImage,
		downloadMapSvg,
		deleteCurrentMap,
		currentUrl,
		setShowLineNumbers,
		showLineNumbers,
		setShowLinkedEvolved,
		showLinkedEvolved,
		areLocalMapsAvailable,
	} = props;
	useEffect(() => {
		if (toggleAutoSave === true) {
			if (saveOutstanding === true) {
				saveMapClick();
			}
		}
	}, [saveOutstanding, saveMapClick, toggleAutoSave]);

	const clickAutoSave = () => {
		toggleAutoSave ? setToggleAutoSave(false) : setToggleAutoSave(true);
	};

	const example = () => {
		mutateMapText(ExampleMap);
		setMetaText('');
	};

	const [modalShow, setModalShow] = React.useState(false);
	const textArea = useRef(null);
	const copyCodeToClipboard = () => {
		textArea.current.select();
		document.execCommand('copy');
	};

	return (
		<React.Fragment>
			<small className="d-none d-sm-inline" id="owm-build">
				v{owmBuild}
			</small>
			<Button
				id="example-map"
				onClick={example}
				type="button"
				variant="secondary"
			>
				Example Map
			</Button>
			<Button id="new-map" variant="secondary" onClick={newMapClick}>
				New Map
			</Button>
			<Button
				id="save-map"
				onClick={saveMapLocallyClick}
				type="button"
				variant={isSavedLocally ? 'danger' : 'success'}
			>
				Save Locally
			</Button>
			<Button
				id="save-map"
				onClick={saveMapClick}
				type="button"
				variant={saveOutstanding ? 'danger' : 'success'}
			>
				Save Remotely
			</Button>

			<DropdownButton
				as={ButtonGroup}
				title="More"
				id="bg-nested-dropdown"
				alignRight
				variant="info"
			>
				{areLocalMapsAvailable && (
					<>
						<Dropdown.Item eventKey="3" onClick={deleteCurrentMap}>
							Delete Current Map
						</Dropdown.Item>
						<Dropdown.Divider />
					</>
				)}
				<Dropdown.Item eventKey="1" onClick={downloadMapImage}>
					Download as PNG
				</Dropdown.Item>
				<Dropdown.Item eventKey="2" onClick={downloadMapSvg}>
					Download as SVG
				</Dropdown.Item>
				<Dropdown.Item eventKey="4" onClick={() => setModalShow(true)}>
					Get Clone URL
				</Dropdown.Item>
				<Dropdown.Item
					eventKey="3"
					onClick={clickAutoSave}
					variant={toggleAutoSave ? 'success' : 'danger'}
				>
					{toggleAutoSave
						? 'AutoSave Remotely is On'
						: 'AutoSave Remotely is Off'}
				</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item
					eventKey="4"
					onClick={() => setShowLineNumbers(!showLineNumbers)}
					variant={'plain'}
				>
					{showLineNumbers ? 'Hide Line Numbers' : 'Show Line Numbers'}
				</Dropdown.Item>
				<Dropdown.Item
					eventKey="5"
					onClick={() => setShowLinkedEvolved(!showLinkedEvolved)}
					variant={'plain'}
				>
					{showLinkedEvolved ? 'Hide Evolved Links' : 'Show Evolved Links'}
				</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item
					eventKey="1"
					className="patron"
					rel="noreferrer noopener"
					href="https://www.patreon.com/mapsascode"
					target="_blank"
				>
					Become a Patron
				</Dropdown.Item>
			</DropdownButton>

			<Modal
				show={modalShow}
				onHide={() => setModalShow(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Clone URL
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						You can share this URL with others to allow them to create a new map
						using this map as its initial state.
					</p>
					<p>Any changes made by others will not be reflected in this map.</p>
					{currentUrl === '(unsaved)' ? (
						<Alert variant="danger">Please save your map first!</Alert>
					) : (
						<InputGroup className="mb-3">
							<FormControl
								ref={textArea}
								onChange={function() {}}
								aria-describedby="basic-addon1"
								value={currentUrl.replace('#', '#clone:')}
							/>
							<InputGroup.Append>
								<Button
									variant="outline-secondary"
									onClick={() => copyCodeToClipboard()}
								>
									Copy
								</Button>
							</InputGroup.Append>
						</InputGroup>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant={saveOutstanding ? 'danger' : 'success'}
						onClick={saveMapClick}
					>
						Save Map
					</Button>
					<Button onClick={() => setModalShow(false)}>Close</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}

export default Controls;
