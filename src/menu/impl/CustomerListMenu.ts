import { ApplicationContext } from "@src/configs/ApplicationContext";
import {User } from '@src/entities/entitiesInterfaces/User';
import { Menu } from '@src/menu/Menu';
import { UserManagementService } from "@src/services/UserManagementService";
import {DefaultUserManagementService} from '@src/services/impl/DefaultUserManagementService';

public class CustomerListMenu implements Menu {

	private ApplicationContext context;
	private UserManagementService userManagementService;
	private ResourceBundle rb;
	
	{
		userManagementService = DefaultUserManagementService.getInstance();
		context = ApplicationContext.getInstance();
		rb = ResourceBundle.getBundle(RESOURCE_BUNDLE_BASE_NAME);
	}
	
	@Override
	public void start() {
		printMenuHeader();
		List<User> users = userManagementService.getUsers();
		
		if (users == null || users.size() == 0) {
			System.out.println(rb.getString("no.users.msg"));
		} else {
			for (User user : users) {
				System.out.println(user);
			}
		}
		context.getMainMenu().start();
	}

	@Override
	public void printMenuHeader() {
		System.out.println(rb.getString("customer.list.header"));		
	}

}
