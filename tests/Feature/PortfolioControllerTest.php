<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PortfolioControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_home_page_returns_successful_response_with_expected_props(): void
    {
        $response = $this->get(route('home'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('settings')
            ->has('skills')
            ->has('experiences')
            ->has('services')
            ->has('featuredProjects')
            ->has('testimonials')
            ->has('latestBlogs')
        );
    }

    public function test_about_page_returns_successful_response(): void
    {
        $response = $this->get(route('about'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('About')
            ->has('settings')
            ->has('experiences')
            ->has('educations')
            ->has('certificates')
        );
    }

    public function test_projects_page_returns_successful_response_with_pagination(): void
    {
        $response = $this->get(route('projects.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Projects/Index')
            ->has('projects.data')
            ->has('filters')
        );
    }

    public function test_project_case_study_details_page_renders_accurately(): void
    {
        $project = Project::first();
        $this->assertNotNull($project, 'Database must have at least one project seeded.');

        $response = $this->get(route('projects.show', $project->slug));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Projects/Show')
            ->has('project', fn (Assert $p) => $p
                ->where('slug', $project->slug)
                ->where('name', $project->name)
                ->etc()
            )
            ->has('relatedProjects')
        );
    }

    public function test_contact_form_submits_successfully_with_valid_data(): void
    {
        $payload = [
            'name' => 'Jane Enterprise Client',
            'email' => 'jane@company.com',
            'phone' => '+1 555-0199',
            'project_type' => 'Enterprise ERP',
            'budget' => '$5,000+',
            'subject' => 'Enterprise ERP inquiry',
            'message' => 'We require a customized enterprise ERP management system for our organization.',
        ];

        $response = $this->post(route('contact.submit'), $payload);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Jane Enterprise Client',
            'email' => 'jane@company.com',
            'project_type' => 'Enterprise ERP',
            'budget' => '$5,000+',
        ]);
    }

    public function test_contact_form_validation_fails_on_missing_required_fields(): void
    {
        $response = $this->post(route('contact.submit'), [
            'name' => '',
            'email' => 'invalid-email',
            'message' => 'short',
        ]);

        $response->assertSessionHasErrors(['name', 'email', 'message']);
    }

    public function test_contact_form_rejects_honeypot_spam(): void
    {
        $response = $this->post(route('contact.submit'), [
            'name' => 'Spam Bot',
            'email' => 'bot@spam.com',
            'message' => 'Click this spam link right now',
            'website_url' => 'https://spam-domain.com',
        ]);

        $response->assertSessionHasErrors(['website_url']);
    }
}
